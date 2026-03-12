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
      <h2>Why Microservices?</h2>
      <p>When I joined CertifyMe, the backend was a growing monolith. As the platform scaled to support enterprise credential issuance for thousands of users, it became clear that a microservices architecture was necessary — not just for scalability, but for team velocity and fault isolation.</p>
      <p>Over the following year, I led the design and implementation of 20+ production microservices. Here's what I learned.</p>

      <h2>Principle 1: Define Service Boundaries by Business Capability</h2>
      <p>The most common mistake is splitting services by technical layer (a "database service", a "validation service"). Instead, split by business capability:</p>
      <ul>
        <li>Credential Issuance Service</li>
        <li>Verification Service</li>
        <li>Notification Service</li>
        <li>Integration Gateway</li>
      </ul>
      <p>Each service owns its data, its logic, and its API. This minimizes cross-service coupling and makes each service independently deployable.</p>

      <h2>Principle 2: Use Flask Blueprints for Internal Structure</h2>
      <p>Flask is lightweight, which means structure is your responsibility. I found Blueprints invaluable for keeping each service clean:</p>
      <pre><code>from flask import Blueprint

credential_bp = Blueprint('credentials', __name__, url_prefix='/credentials')

@credential_bp.route('/issue', methods=['POST'])
def issue_credential():
    # ...
    pass</code></pre>
      <p>Each Blueprint maps to a bounded context. Register them in the app factory, not globally. This makes testing individual blueprints trivial.</p>

      <h2>Principle 3: Async Task Queues for Heavy Work</h2>
      <p>Credential issuance involves PDF generation, blockchain anchoring, and email delivery. None of these should block an HTTP response. We used Celery with Redis as the broker:</p>
      <pre><code>from celery import Celery

celery = Celery('tasks', broker='redis://localhost:6379/0')

@celery.task
def issue_credential_async(credential_id):
    # generate PDF, anchor on chain, send email
    pass</code></pre>
      <p>This kept API response times under 200ms even for complex issuance workflows.</p>

      <h2>Principle 4: Standardize Inter-Service Communication</h2>
      <p>We used REST for synchronous calls and Redis pub/sub for event-driven flows. The key rule: never call another service's database directly. Always go through its API. This is the hardest discipline to maintain but the most important.</p>

      <h2>Principle 5: Centralized Auth, Distributed Enforcement</h2>
      <p>We implemented OAuth2 at the API gateway level and passed JWT tokens downstream. Each service validated the token locally using a shared secret — no round-trips to an auth service on every request:</p>
      <pre><code>import jwt
from functools import wraps

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        g.user = payload
        return f(*args, **kwargs)
    return decorated</code></pre>

      <h2>Lessons Learned</h2>
      <p>After building these in production, the biggest lessons were: (1) distributed tracing is non-negotiable — add it from day one, (2) idempotency keys prevent duplicate issuance under retry conditions, and (3) health check endpoints on every service save hours during incidents.</p>
      <p>Microservices add operational complexity. Make sure the complexity is worth it for your scale. For CertifyMe, it absolutely was.</p>
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
      <h2>The Problem RAG Solves</h2>
      <p>Large Language Models are powerful but have a fundamental limitation: their knowledge is frozen at training time. Ask GPT-4 about your company's internal documentation, and it will hallucinate. Ask it about events from last week, and it won't know.</p>
      <p>Retrieval-Augmented Generation (RAG) solves this by giving the model a retrieval mechanism — a way to look up relevant information at inference time before generating a response.</p>

      <h2>How RAG Works</h2>
      <p>The RAG pipeline has two phases:</p>
      <h3>1. Indexing (offline)</h3>
      <ul>
        <li>Split your documents into chunks (e.g., 512 tokens each)</li>
        <li>Embed each chunk using an embedding model (e.g., <code>text-embedding-3-small</code>)</li>
        <li>Store vectors in a vector database (e.g., pgvector, Chroma, Pinecone)</li>
      </ul>
      <h3>2. Retrieval + Generation (online)</h3>
      <ul>
        <li>Embed the user's query</li>
        <li>Find the top-k most similar chunks via cosine similarity</li>
        <li>Inject retrieved chunks into the LLM prompt as context</li>
        <li>LLM generates a grounded response</li>
      </ul>

      <h2>A Simple RAG Pipeline in Python</h2>
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
    context = "\\n\\n".join(context_chunks)
    prompt = f"Context:\\n{context}\\n\\nQuestion: {query}\\nAnswer:"
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content</code></pre>

      <h2>When to Use RAG vs Fine-tuning</h2>
      <p>RAG is best when your knowledge base changes frequently or when you need the model to cite sources. Fine-tuning is better when you need to change the model's behavior or style permanently.</p>
      <p>For most enterprise use cases — internal knowledge bases, document Q&A, customer support — RAG is the right starting point. It's cheaper, faster to iterate on, and doesn't require retraining.</p>

      <h2>Advanced Patterns</h2>
      <p><strong>Hybrid search:</strong> Combine semantic search (vector similarity) with keyword search (BM25) for better recall on specific terms.</p>
      <p><strong>Re-ranking:</strong> Use a cross-encoder to re-rank retrieved chunks before injecting them into the prompt.</p>
      <p><strong>Agentic RAG:</strong> Let the LLM decide when to retrieve and what query to use — this dramatically improves multi-step reasoning.</p>

      <h2>Getting Oracle Certified in RAG</h2>
      <p>I recently earned the Oracle AI Vector Search Certified Professional certification, which covers vector embeddings, similarity search, and building AI applications using Oracle's vector database capabilities. If you're serious about RAG in enterprise environments, OCI's vector search is worth exploring.</p>
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
      <h2>The Idea Behind DJoz</h2>
      <p>What if your music player knew you were sad before you did? DJoz (Dynamic Jukebox) started as a hackathon concept: use real-time facial emotion recognition to recommend music and video content that matches — or improves — your mood.</p>
      <p>The result is an AI system that reads your face via webcam, classifies your emotion, and curates a playlist accordingly.</p>

      <h2>The Emotion Recognition Pipeline</h2>
      <h3>Step 1: Face Detection with Haar Cascades</h3>
      <p>The first step is detecting faces in each video frame. OpenCV's Haar Cascade classifier is fast enough for real-time use:</p>
      <pre><code>import cv2

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    for (x, y, w, h) in faces:
        face_roi = gray[y:y+h, x:x+w]
        # pass to emotion classifier
        pass</code></pre>

      <h3>Step 2: Emotion Classification</h3>
      <p>I trained a CNN on the FER-2013 dataset — 35,000 labeled facial images across 7 emotion classes: angry, disgust, fear, happy, neutral, sad, surprise.</p>
      <p>The model architecture is a small ConvNet with 4 convolutional blocks followed by a softmax output layer. Training for 50 epochs on FER-2013 achieves ~65% validation accuracy — which is actually quite good given how subjective emotion labeling is in the dataset.</p>

      <h3>Step 3: Emotion-to-Playlist Mapping</h3>
      <p>Each emotion maps to a curated content category stored in MySQL:</p>
      <ul>
        <li><strong>Happy</strong> → Upbeat pop, comedy videos</li>
        <li><strong>Sad</strong> → Acoustic / lo-fi, uplifting content</li>
        <li><strong>Angry</strong> → Heavy metal or calming meditation</li>
        <li><strong>Neutral</strong> → Ambient / focus music</li>
        <li><strong>Surprise</strong> → Discovery playlist, trending</li>
      </ul>

      <h3>Step 4: Real-time Smoothing</h3>
      <p>Raw emotion predictions are noisy frame-to-frame. I applied a rolling mode over the last 30 frames (~1 second at 30fps) to stabilize the detected emotion before triggering a recommendation change. This prevents jarring playlist switches from momentary expressions.</p>

      <h2>Flask Interface</h2>
      <p>The webcam feed is streamed to the browser via Flask's <code>Response</code> with MIME type <code>multipart/x-mixed-replace</code> — the simplest way to stream video frames over HTTP without WebSockets:</p>
      <pre><code>from flask import Response

def gen_frames():
    while True:
        frame = process_frame()  # detect + annotate emotion
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\\r\\nContent-Type: image/jpeg\\r\\n\\r\\n'
               + buffer.tobytes() + b'\\r\\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')</code></pre>

      <h2>What I Would Do Differently</h2>
      <p>The Haar Cascade detector struggles with non-frontal faces and poor lighting. I'd replace it with a MediaPipe Face Mesh detector for production use — it's more robust and runs on-device efficiently. I'd also use transfer learning from a pretrained ResNet instead of training a CNN from scratch, which would improve accuracy significantly with less data.</p>
      <p>DJoz is open source — check it out on <a href="https://github.com/Harshitgupta5290/emotion-based-music-and-video-recommendation-system" target="_blank" class="text-[#16f2b3] hover:underline">GitHub</a>.</p>
    `,
  },
];
