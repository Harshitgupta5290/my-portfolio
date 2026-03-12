export const blogsData = [
  {
    id: 1,
    slug: 'building-production-microservices-python-flask',
    title: 'Building Production-Grade Microservices with Python and Flask',
    description:
      'A practical guide to designing, implementing, and scaling microservices architecture using Python and Flask — based on real experience building 20+ production services at CertifyMe.',
    published_at: '2025-03-10',
    reading_time_minutes: 9,
    tags: ['Python', 'Flask', 'Microservices', 'Backend'],
    ai_assisted: true,
    content: `
      <div class="blog-tldr">
        <strong>TL;DR</strong>
        <p>Microservices aren't magic — they're a trade-off. This post covers 5 hard-won principles from building 20+ production services: right service boundaries, Flask Blueprint structure, async task queues, inter-service communication, and centralized auth. Skip to any principle that's relevant to you.</p>
      </div>

      <h2>The Monolith That Couldn't Keep Up</h2>

      <p>Picture this: it's 3 AM, and your on-call engineer is knee-deep in a deployment that's taking down the entire platform because a single credential-rendering bug brought along the notification system, the API gateway, and the user dashboard with it. That was us at CertifyMe — before we made the switch.</p>

      <p>When I joined, the backend was a growing monolith. As the platform scaled to support enterprise credential issuance for tens of thousands of users across 100+ organizations, it became clear that a microservices architecture wasn't just preferable — it was necessary for survival. Over the following year, I led the design and implementation of 20+ production microservices. Here's everything I wish I'd known before we started.</p>

      <div class="blog-callout blog-callout-warning">
        <strong>Before you refactor</strong>
        <p>Microservices add real operational complexity. Only make the move if you have clear pain points: deployment coupling, team velocity bottlenecks, or scaling needs that a monolith genuinely can't solve. Don't do it for the architecture diagram.</p>
      </div>

      <h2>Principle 1: Define Service Boundaries by Business Capability</h2>

      <p>The most common (and painful) mistake is splitting services by technical layer — "a database service", "a validation service", "a utils service". This creates distributed coupling that's worse than a monolith.</p>

      <p>Instead, split by <strong>business capability</strong>. Ask: what does this service <em>own</em>? At CertifyMe, our service map looked like this:</p>

      <ul>
        <li><strong>Credential Issuance Service</strong> — the full issuance lifecycle</li>
        <li><strong>Verification Service</strong> — public-facing credential verification & blockchain anchoring</li>
        <li><strong>Notification Service</strong> — email, webhook, and in-app delivery</li>
        <li><strong>Integration Gateway</strong> — third-party LMS & HR system connections</li>
      </ul>

      <p>Each service owns its data, its logic, and its API. Zero shared databases. This is the hardest rule to enforce but the most important one — the moment two services share a table, you've just built a distributed monolith.</p>

      <h2>Principle 2: Use Flask Blueprints for Internal Structure</h2>

      <p>Flask is deliberately minimal. That's a feature, not a bug — but it means structure is entirely your responsibility. We found Blueprints invaluable for keeping each service clean and testable:</p>

      <pre><code>from flask import Blueprint

credential_bp = Blueprint('credentials', __name__, url_prefix='/credentials')

@credential_bp.route('/issue', methods=['POST'])
def issue_credential():
    # Single responsibility: orchestrate issuance
    pass

# Register in the app factory — never globally
def create_app():
    app = Flask(__name__)
    app.register_blueprint(credential_bp)
    return app</code></pre>

      <p>Each Blueprint maps to a bounded context within the service. The app factory pattern makes testing individual blueprints trivial — just create the app in test mode and hit the routes directly.</p>

      <div class="blog-callout blog-callout-tip">
        <strong>Pro tip</strong>
        <p>Keep your route handlers thin. They should do one thing: validate input, call a service layer function, return the response. All business logic lives in the service layer, not in route handlers. This makes unit testing your logic effortless.</p>
      </div>

      <h2>Principle 3: Async Task Queues for Heavy Work</h2>

      <p>Credential issuance involves PDF generation, blockchain anchoring, and email delivery. These operations take 2–8 seconds each. None of them should block an HTTP response — your users will think the site is broken.</p>

      <p>We solved this with Celery backed by Redis as the message broker:</p>

      <pre><code>from celery import Celery

celery = Celery('tasks', broker='redis://localhost:6379/0')

@celery.task(bind=True, max_retries=3)
def issue_credential_async(self, credential_id):
    try:
        pdf = generate_pdf(credential_id)
        anchor_on_blockchain(credential_id, pdf.hash)
        send_email(credential_id, pdf.url)
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)  # retry in 60s</code></pre>

      <p>This kept API response times under 200ms even for the most complex issuance workflows. The user gets an immediate "processing" response, and the heavy work happens in the background with automatic retries on failure.</p>

      <h2>Principle 4: Standardize Inter-Service Communication</h2>

      <p>We used two patterns: REST for synchronous calls (when you need an immediate answer) and Redis pub/sub for event-driven flows (when you just need to notify).</p>

      <p>The non-negotiable rule: <strong>never call another service's database directly.</strong> Always go through its API. This is the hardest discipline to maintain, especially under deadline pressure. But the day you break it is the day you start accumulating hidden coupling that will bite you six months later during a schema migration.</p>

      <div class="blog-callout">
        <strong>Architecture pattern</strong>
        <p>Synchronous REST for queries that need immediate results. Redis pub/sub events for state changes that other services react to. Example: when a credential is issued, the Issuance Service publishes a <code>credential.issued</code> event — the Notification Service and Analytics Service both listen and react independently. Neither service needs to know the other exists.</p>
      </div>

      <h2>Principle 5: Centralized Auth, Distributed Enforcement</h2>

      <p>We implemented OAuth2 at the API gateway level and passed JWT tokens downstream. Each service validated the token locally using a shared secret — no round-trips to an auth service on every request. This pattern keeps latency low while maintaining security:</p>

      <pre><code>import jwt
from functools import wraps
from flask import request, g, abort

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            abort(401)
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            g.user = payload
        except jwt.ExpiredSignatureError:
            abort(401, 'Token expired')
        except jwt.InvalidTokenError:
            abort(401, 'Invalid token')
        return f(*args, **kwargs)
    return decorated</code></pre>

      <p>We also implemented AES-256 encryption for credential payloads in transit and at rest — a compliance requirement for enterprise customers that's much easier to add at the service level than to retrofit into a monolith.</p>

      <h2>Operational Realities Nobody Talks About</h2>

      <p>The five principles above will get you a working microservices architecture. These lessons will save you from 3 AM incidents:</p>

      <p><strong>Add distributed tracing on day one.</strong> When a request touches 4 services and something goes wrong, you need a correlation ID that follows the request through every log. We added this retroactively and it was painful. Use OpenTelemetry from the start.</p>

      <p><strong>Idempotency keys are not optional.</strong> Networks fail. Clients retry. Without idempotency keys on your write operations, you will issue duplicate credentials. We learned this the hard way.</p>

      <p><strong>Health check endpoints on every service.</strong> A simple <code>/health</code> endpoint returning 200 saves hours during incidents. Your load balancer, your monitoring, and your sanity will thank you.</p>

      <div class="blog-takeaway">
        <h3>Key Takeaways</h3>
        <ul>
          <li>Split by business capability, never by technical layer</li>
          <li>No shared databases — ever. Own your data or don't have it</li>
          <li>Celery + Redis for anything that takes &gt; 500ms</li>
          <li>REST for synchronous queries, pub/sub for events</li>
          <li>JWT local validation — no auth service round-trips on every request</li>
          <li>Distributed tracing, idempotency keys, and health checks from day one</li>
        </ul>
      </div>
    `,
  },
  {
    id: 2,
    slug: 'getting-started-with-rag-retrieval-augmented-generation',
    title: 'Getting Started with RAG: Retrieval-Augmented Generation Explained',
    description:
      'RAG is one of the most practical patterns for building AI applications with LLMs. This post explains how it works, when to use it, and how to build a basic RAG pipeline from scratch.',
    published_at: '2025-02-24',
    reading_time_minutes: 8,
    tags: ['RAG', 'LLMs', 'AI', 'Python'],
    ai_assisted: true,
    content: `
      <div class="blog-tldr">
        <strong>TL;DR</strong>
        <p>RAG (Retrieval-Augmented Generation) gives LLMs access to your private, up-to-date data at inference time — without retraining. It works in two phases: offline indexing (chunk → embed → store) and online retrieval (embed query → fetch top-k chunks → inject into prompt). Use RAG when your knowledge changes frequently. Use fine-tuning when you need to change behavior permanently.</p>
      </div>

      <h2>The Problem: LLMs Are Frozen in Time</h2>

      <p>Imagine you've built a customer support bot on GPT-4. Your users love it — until they ask about the new feature you shipped last week. The model confidently gives them outdated information. Or worse, it hallucinates an answer that sounds plausible but is completely wrong.</p>

      <p>This isn't a GPT-4 problem. It's a fundamental limitation of how LLMs work: their knowledge is frozen at the training cutoff. Ask any model about your company's internal docs, last quarter's data, or anything that happened after its training — and it will either say "I don't know" or make something up.</p>

      <p>Retrieval-Augmented Generation (RAG) solves this elegantly. Instead of baking knowledge into the model's weights, you give the model a retrieval mechanism — a way to look up relevant information from your data store at inference time, right before generating a response.</p>

      <div class="blog-callout blog-callout-tip">
        <strong>Why this matters in 2025</strong>
        <p>As LLM context windows grow larger (128K, 1M tokens), some people ask: why not just dump your entire knowledge base into the prompt? Cost and latency. Embedding a 10,000-document knowledge base into every query would cost thousands of dollars per day and add seconds of latency. RAG retrieves only the 3-5 most relevant chunks — surgical precision at a fraction of the cost.</p>
      </div>

      <h2>How RAG Works: The Two-Phase Pipeline</h2>

      <h3>Phase 1: Indexing (runs offline, once)</h3>

      <p>This is the prep work. You take your documents — PDFs, Notion pages, database records, whatever — and transform them into searchable vector representations:</p>

      <ul>
        <li><strong>Chunk</strong> your documents into smaller pieces (typically 256–512 tokens)</li>
        <li><strong>Embed</strong> each chunk using an embedding model (e.g., <code>text-embedding-3-small</code>)</li>
        <li><strong>Store</strong> the vectors in a vector database (pgvector, Chroma, Pinecone, etc.)</li>
      </ul>

      <h3>Phase 2: Retrieval + Generation (runs on every query)</h3>

      <ul>
        <li><strong>Embed</strong> the user's question using the same embedding model</li>
        <li><strong>Search</strong> for the top-k most semantically similar chunks via cosine similarity</li>
        <li><strong>Inject</strong> retrieved chunks into the LLM prompt as context</li>
        <li><strong>Generate</strong> a grounded, accurate response</li>
      </ul>

      <h2>Building a Basic RAG Pipeline in Python</h2>

      <p>Here's a minimal but complete implementation that demonstrates the core mechanics:</p>

      <pre><code>import openai
import numpy as np

def embed(text):
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def retrieve(query, chunks, embeddings, top_k=3):
    query_emb = embed(query)
    scores = [cosine_similarity(query_emb, e) for e in embeddings]
    top_indices = np.argsort(scores)[-top_k:][::-1]
    return [chunks[i] for i in top_indices]

def generate(query, context_chunks):
    context = "\\n\\n---\\n\\n".join(context_chunks)
    prompt = f"""You are a helpful assistant. Use only the context below to answer.
If the answer isn't in the context, say "I don't have that information."

Context:
{context}

Question: {query}
Answer:"""
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content</code></pre>

      <div class="blog-callout blog-callout-warning">
        <strong>Common mistake</strong>
        <p>Notice the explicit instruction "Use only the context below." Without this, the model will blend retrieved context with its training knowledge — defeating the purpose of RAG. Always constrain the model to the provided context and have it admit when information isn't available.</p>
      </div>

      <h2>RAG vs Fine-tuning: Which Should You Use?</h2>

      <p>This is the most common question I get. The answer depends on what you're actually trying to solve:</p>

      <p><strong>Use RAG when:</strong> your knowledge base changes frequently, you need the model to cite sources, you need to handle large volumes of documents, or you're building an internal knowledge base or document Q&amp;A system.</p>

      <p><strong>Use fine-tuning when:</strong> you need to permanently change the model's tone/style/behavior, you have a very specific task with consistent input-output patterns, or you need sub-10ms latency with no retrieval step.</p>

      <p>For most enterprise applications — internal wikis, customer support, document analysis — RAG is the right starting point. It's cheaper, faster to iterate on, doesn't require retraining, and lets you update your knowledge base without touching the model.</p>

      <h2>Advanced Patterns Worth Knowing</h2>

      <p><strong>Hybrid search</strong> combines semantic vector search with traditional keyword search (BM25). This is critical for queries with specific technical terms, product names, or codes that embedding models might not capture well semantically. The combination almost always outperforms either approach alone.</p>

      <p><strong>Re-ranking</strong> adds a second pass: after retrieving the top-20 chunks by similarity, a cross-encoder model re-ranks them by actual relevance to the query. This dramatically improves precision when your retrieval step casts a wide net.</p>

      <p><strong>Agentic RAG</strong> lets the LLM decide <em>when</em> to retrieve, <em>what</em> to query for, and <em>how many</em> retrieval steps to take. For multi-step reasoning tasks, this approach significantly outperforms a single-shot retrieve-and-generate pipeline. This is the direction the field is moving in 2025.</p>

      <div class="blog-callout">
        <strong>Oracle AI Vector Search</strong>
        <p>I recently earned the Oracle AI Vector Search Certified Professional certification, which covers production-grade vector embedding pipelines, similarity search optimization, and building RAG applications on Oracle Cloud. If you're deploying RAG in enterprise environments with existing Oracle infrastructure, OCI's native vector search capabilities are worth a serious look.</p>
      </div>

      <div class="blog-takeaway">
        <h3>Key Takeaways</h3>
        <ul>
          <li>RAG = retrieval at inference time; your data stays fresh without retraining</li>
          <li>Two phases: offline indexing (chunk → embed → store) and online retrieval+generation</li>
          <li>Always instruct the model to stay within the provided context to prevent hallucination</li>
          <li>Hybrid search (vector + BM25) beats pure vector search for most real-world queries</li>
          <li>Choose RAG for dynamic knowledge; fine-tuning for permanent behavior changes</li>
          <li>Agentic RAG is the frontier for complex, multi-step reasoning tasks</li>
        </ul>
      </div>
    `,
  },
  {
    id: 3,
    slug: 'real-time-emotion-detection-opencv-djoz',
    title: 'Real-time Emotion Detection with OpenCV: How DJoz Works',
    description:
      'DJoz is an AI-powered music and video recommendation system that reads your facial emotions in real time. Here is a deep dive into the computer vision pipeline behind it.',
    published_at: '2025-01-15',
    reading_time_minutes: 7,
    tags: ['OpenCV', 'Machine Learning', 'Computer Vision', 'Python'],
    ai_assisted: true,
    content: `
      <div class="blog-tldr">
        <strong>TL;DR</strong>
        <p>DJoz uses a real-time computer vision pipeline to detect your facial emotion via webcam and recommend music accordingly. Stack: OpenCV (Haar Cascade for face detection) → CNN trained on FER-2013 (emotion classification, ~65% accuracy) → MySQL-backed playlist mapping → Flask streaming. This post walks through each layer and what I'd do differently today.</p>
      </div>

      <h2>The Idea That Started It</h2>

      <p>It was late at night during a college hackathon. Someone put on a sad playlist and the room felt heavier. I wondered: what if the music player could sense the mood of the room itself — not from what you clicked, but from what your face was saying?</p>

      <p>That question became DJoz (Dynamic Jukebox). An AI system that reads your face via webcam, classifies your emotional state in real time, and curates a playlist that matches — or intentionally contrasts — your mood. No buttons. No search. Just look at the camera.</p>

      <p>Here's a complete breakdown of how the computer vision pipeline works under the hood.</p>

      <h2>The Full Pipeline at a Glance</h2>

      <p>Before diving into each component, here's the end-to-end flow:</p>

      <pre><code>Webcam frame
    ↓
Grayscale conversion
    ↓
Haar Cascade face detector  →  face bounding box (x, y, w, h)
    ↓
Crop + resize to 48×48px
    ↓
CNN (trained on FER-2013)   →  emotion probabilities [angry, disgust, fear, happy, neutral, sad, surprise]
    ↓
Rolling mode (last 30 frames)  →  stable emotion label
    ↓
MySQL playlist lookup
    ↓
Render recommendation to browser</code></pre>

      <h2>Step 1: Face Detection with Haar Cascades</h2>

      <p>The first challenge is finding where the face is in each video frame. OpenCV's Haar Cascade classifier is fast enough to run in real-time on a CPU — critical for a webcam-based system that needs to process 30 frames per second:</p>

      <pre><code>import cv2

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(48, 48)
    )
    for (x, y, w, h) in faces:
        face_roi = gray[y:y+h, x:x+w]
        face_roi = cv2.resize(face_roi, (48, 48))
        # pass to CNN classifier</code></pre>

      <div class="blog-callout blog-callout-warning">
        <strong>Known limitation</strong>
        <p>Haar Cascades are trained on frontal faces under good lighting. They struggle significantly with faces at angles &gt;30°, poor lighting, or partial occlusion (glasses, masks). For a production system, you'd replace this with MediaPipe Face Mesh — more robust, runs on-device, and handles a much wider range of conditions.</p>
      </div>

      <h2>Step 2: Emotion Classification with a CNN</h2>

      <p>Once we have the face region, we pass it through a Convolutional Neural Network trained on the FER-2013 dataset — 35,887 labeled facial images across 7 emotion classes: angry, disgust, fear, happy, neutral, sad, and surprise.</p>

      <p>The architecture is deliberately lightweight: 4 convolutional blocks (Conv2D → BatchNorm → MaxPool → Dropout) followed by two dense layers and a softmax output. The small size keeps inference fast enough for real-time use.</p>

      <p>Training for 50 epochs on FER-2013 achieves approximately <strong>65% validation accuracy</strong>. That number might sound low, but context matters: emotion classification is inherently subjective. Even human labelers disagreed on 20–30% of FER-2013 images. For a recommendation system where "close enough" is sufficient, 65% works well in practice.</p>

      <h2>Step 3: Emotion-to-Playlist Mapping</h2>

      <p>Each detected emotion maps to a curated content category stored in MySQL. The mapping reflects both intuitive matching and deliberate therapeutic contrast:</p>

      <ul>
        <li><strong>Happy</strong> → Upbeat pop, feel-good playlists, comedy shorts</li>
        <li><strong>Sad</strong> → Lo-fi / acoustic (comforting), then gradually uplifting content</li>
        <li><strong>Angry</strong> → Two tracks: high-energy metal (release) or guided meditation (calm)</li>
        <li><strong>Neutral</strong> → Ambient / focus music — the default working state</li>
        <li><strong>Fear / Surprise</strong> → Discovery playlist — unfamiliar, interesting content</li>
        <li><strong>Disgust</strong> → Palate cleanser — highly-rated, universally-liked content</li>
      </ul>

      <h2>Step 4: Temporal Smoothing</h2>

      <p>Raw frame-by-frame predictions are noisy. Your expression changes dozens of times per second — a single surprised blink shouldn't trigger a playlist switch.</p>

      <p>The fix is a rolling mode: collect the predicted emotion for the last 30 frames (~1 second at 30fps), and only trigger a recommendation change if the majority emotion in that window differs from the current one:</p>

      <pre><code>from collections import deque
from statistics import mode

emotion_buffer = deque(maxlen=30)

def get_stable_emotion(raw_emotion):
    emotion_buffer.append(raw_emotion)
    if len(emotion_buffer) == 30:
        return mode(emotion_buffer)
    return None  # wait for buffer to fill</code></pre>

      <p>This single change made the system feel natural instead of jittery — the difference between a prototype and something you'd actually want to use.</p>

      <h2>Step 5: Streaming to the Browser via Flask</h2>

      <p>The processed video feed (with emotion overlay annotations) is streamed to the browser using Flask's <code>multipart/x-mixed-replace</code> MIME type — the simplest way to push live video over HTTP without WebSockets:</p>

      <pre><code>from flask import Response

def gen_frames():
    while True:
        frame = capture_and_annotate_frame()  # detect + classify + draw
        _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
        yield (
            b'--frame\\r\\n'
            b'Content-Type: image/jpeg\\r\\n\\r\\n'
            + buffer.tobytes()
            + b'\\r\\n'
        )

@app.route('/video_feed')
def video_feed():
    return Response(
        gen_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )</code></pre>

      <div class="blog-callout blog-callout-tip">
        <strong>Performance tip</strong>
        <p>JPEG quality of 85 is a good sweet spot — it looks visually indistinguishable from 100 but the file size is 3–4x smaller. For a 640×480 webcam stream, this alone cuts bandwidth from ~8 MB/s to ~2 MB/s.</p>
      </div>

      <h2>What I'd Do Differently Today</h2>

      <p>Building DJoz taught me more than any textbook. With two more years of experience, here's how I'd redesign it:</p>

      <p><strong>Replace Haar Cascade with MediaPipe Face Mesh.</strong> It handles non-frontal faces, varying lighting, and partial occlusion — all the conditions where DJoz currently struggles. It also provides 468 facial landmarks for free, enabling much richer feature extraction.</p>

      <p><strong>Use transfer learning instead of training from scratch.</strong> Starting from a pretrained ResNet-50 or EfficientNet and fine-tuning on FER-2013 would likely push accuracy from 65% to 75%+ while training significantly faster.</p>

      <p><strong>Add a confidence threshold.</strong> If the model is less than 60% confident in its emotion prediction, don't trigger a recommendation change. This would dramatically reduce false positives from ambiguous expressions.</p>

      <div class="blog-takeaway">
        <h3>Key Takeaways</h3>
        <ul>
          <li>Haar Cascades are fast but brittle — MediaPipe is the modern replacement</li>
          <li>65% accuracy on FER-2013 is reasonable given the dataset's inherent subjectivity</li>
          <li>Temporal smoothing (rolling mode over 30 frames) is essential for stable UX</li>
          <li>JPEG quality 85 is the sweet spot between visual quality and bandwidth</li>
          <li>Transfer learning from ResNet/EfficientNet beats training CNN from scratch for most CV tasks</li>
          <li>For production emotion detection: MediaPipe + pretrained backbone + confidence thresholding</li>
        </ul>
      </div>

      <p>DJoz is open source — check it out on <a href="https://github.com/Harshitgupta5290/emotion-based-music-and-video-recommendation-system" target="_blank" class="text-[#16f2b3] hover:underline">GitHub</a>.</p>
    `,
  },
];
