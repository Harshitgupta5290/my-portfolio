# Deployment & Production Setup

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Vercel account
- OpenAI API key
- GitHub access token (optional)

## Setup Steps

### 1. Local Development Setup

```bash
# Clone repository
git clone <your-repo>
cd my-portfolio

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Initialize database
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev

# Open http://localhost:3000
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb portfolio_db

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"

# Run migrations
npx prisma migrate deploy

# Seed initial data (optional)
npx prisma db seed
```

### 3. Environment Configuration

Create `.env.local` with:

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-string"
NEXTAUTH_ADMIN_PASSWORD="your-secure-password"

# OpenAI
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4"

# Analytics
GOOGLE_ANALYTICS_ID="G-..."

# Storage
BLOB_READ_WRITE_TOKEN="..."

# Email
RESEND_API_KEY="re_..."
```

### 4. Production Deployment (Vercel)

```bash
# Connect to Vercel
npm i -g vercel
vercel

# Set environment variables in Vercel dashboard
# Link PostgreSQL database
# Deploy
vercel --prod
```

#### Vercel Configuration

1. **Create `vercel.json`**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["sfo1"],
  "env": {
    "NEXTAUTH_URL": "@nextauth_url",
    "DATABASE_URL": "@database_url",
    "OPENAI_API_KEY": "@openai_key"
  }
}
```

2. **Post-deployment**:
   - Run migrations: `vercel env pull && npx prisma migrate deploy`
   - Check health: `https://yourdomain.com/api/health`

### 5. Database (PostgreSQL on Railway/Supabase)

**Option A: Railway**
```bash
# Connect Railway
npm i -g @railway/cli
railway login
railway link

# Deploy and get DATABASE_URL
railway environment
```

**Option B: Supabase**
```bash
# Create project at supabase.com
# Copy connection string to DATABASE_URL
# Run migrations with Prisma
npx prisma migrate deploy
```

### 6. CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 7. Monitoring & Observability

```bash
# Setup Sentry for error tracking
npm install @sentry/nextjs

# Setup Google Analytics
# Add GOOGLE_ANALYTICS_ID to env
```

### 8. SSL & Security

- Vercel handles SSL automatically ✅
- Set NEXTAUTH_URL to production domain
- Create `.env.production` for prod secrets
- Enable CORS headers in `next.config.js`

### 9. Performance Optimization

```bash
# Build analysis
npm run build -- --analyze

# Lighthouse audit (on production)
npm install -g lighthouse
lighthouse https://yourdomain.com
```

### 10. Database Backups

```bash
# For Supabase: Automatic daily backups enabled
# For Railway: Manual backups via dashboard

# Export data
npx prisma db dump > backup.sql

# Restore data
psql -U user -d database < backup.sql
```

## Production Checklist

- [ ] Database configured and migrated
- [ ] Environment variables set in Vercel
- [ ] OpenAI API key added
- [ ] Google Analytics configured
- [ ] SSL certificate verified
- [ ] Admin credentials set
- [ ] Email service configured
- [ ] Backups automated
- [ ] Monitoring (Sentry) setup
- [ ] Rate limiting configured
- [ ] CORS headers set
- [ ] Security headers enabled
- [ ] Lighthouse score 95+
- [ ] SEO verified (robots.txt, sitemap)
- [ ] Analytics working
- [ ] Forms submission working
- [ ] Admin dashboard accessible
- [ ] CDN/Caching optimized

## Monitoring Commands

```bash
# Check health
curl https://yourdomain.com/api/health

# Monitor database
npx prisma studio

# View logs
vercel logs
```

## Troubleshooting

**Build fails**: Check Node.js version, install dependencies locally first

**Database errors**: Verify DATABASE_URL, run migrations with `npx prisma migrate deploy`

**API errors**: Check OPENAI_API_KEY, verify rate limits

**Performance issues**: Check Lighthouse, optimize images, enable caching

---

**Deployment should result in:**
- ✅ Sub-second page loads
- ✅ 95+ Lighthouse score
- ✅ Full SEO optimization
- ✅ Production-grade security
- ✅ Auto-scaling infrastructure
