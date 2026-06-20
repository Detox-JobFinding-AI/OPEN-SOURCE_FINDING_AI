# 📋 Features & Tasks Registry

This file contains the active list of tasks and features for our project. If you wish to claim a task, please enter your name and select your role under the specific task header, then commit/push or submit a Pull Request.

---

## 🚦 Status Definitions

* `[Open]`: Task is free to be taken by anyone.
* `[Claimed - Role 1]`: Role 1 (Feature Adder) is currently building the feature.
* `[Role 2 verification pending]`: Role 1 has pushed the feature. Role 2 (Bug Fixer) is reviewing it or has pending fixes.
* `[Verified / Closed]`: Role 2 has verified, fixed any issues, and the task is complete.

---

## 🛠️ Active Tasks

### Module 1: User Authentication & Profile Management

#### 1.1 Create user registration and login system
* **Description**: Develop secure user registration and login endpoints (backend) and forms (frontend) using JWT authentication.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 1.2 Implement employer and job seeker account types
* **Description**: Create separate user profile schemas, registration paths, and permissions for Employers vs. Job Seekers.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 1.3 Create profile management pages
* **Description**: Develop Frontend interfaces and Backend APIs for users to update personal info, profile pictures, and account settings.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 1.4 Add email verification and password recovery
* **Description**: Integrate SMTP/email service to send OTPs/tokens for email validation and secure password resets.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 1.5 Implement role-based access control (RBAC)
* **Description**: Define backend middleware/decorators to enforce API endpoint authorization based on user roles (Admin, Employer, Job Seeker).
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 2: Resume Upload & Processing

#### 2.1 Support PDF, DOCX, and TXT resume uploads
* **Description**: Build secure file upload handlers checking file formats, MIME types, and file size limits.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 2.2 Extract text from uploaded resumes
* **Description**: Integrate text extraction libraries (like pdfplumber/PyPDF2, python-docx) to parse raw text from PDF, DOCX, and TXT files.
* **Role 1 (Feature Adder)**: ekansh116
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Role 2 verification pending]`

#### 2.3 Clean and normalize resume content
* **Description**: Build text cleaning utilities to remove garbage characters, normalize whitespaces, and prepare text for LLM parsing.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 2.4 Store original resume files securely
* **Description**: Configure secure storage (Local/S3/MinIO) for uploading and retrieving original resume files, implementing encryption-at-rest.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 2.5 Create resume metadata management system
* **Description**: Set up database schemas to track uploaded files, file paths, upload timestamps, file sizes, and processing statuses.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 3: Local LLM Resume Analysis

#### 3.1 Integrate local LLM through Ollama
* **Description**: Configure API integration client to communicate with a locally hosted Ollama instance (default: Llama3 or Mistral).
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 3.2 Extract skills, education, certifications, projects, and experience
* **Description**: Construct optimized structured prompts (JSON mode) to extract entities from raw resume text using the local LLM.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 3.3 Generate structured resume representation
* **Description**: Convert LLM JSON responses into strongly-typed validation schemas (using Pydantic or TypeScript interfaces) and store them in the database.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 3.4 Calculate section-wise weights
* **Description**: Implement algorithms to calculate resume weights based on completeness, recency of experience, and project complexity.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 3.5 Create confidence scoring mechanism
* **Description**: Build a validation framework to score the LLM's extraction confidence by verifying outputs against expected data structures.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 4: Resume Archetype & Delta Storage System

#### 4.1 Design resume archetype database
* **Description**: Design DB schemas for storing "archetype" templates (generalized structures representing specific careers/levels, e.g. "Senior React Developer").
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 4.2 Create archetype generation algorithms
* **Description**: Develop clustering/generalization algorithms that group similar resume structures into a single career archetype.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 4.3 Implement similarity matching between resumes and archetypes
* **Description**: Create metrics to evaluate how closely an individual candidate's structured resume matches a baseline archetype.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 4.4 Develop delta storage mechanism
* **Description**: Build storage logic that stores only the "deltas" (differences: additional skills, unique projects) between a candidate's resume and their matching archetype to optimize DB storage.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 4.5 Create resume reconstruction system
* **Description**: Develop functions that combine a base archetype and a stored delta to reconstruct the complete structured candidate profile.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 4.6 Optimize storage efficiency
* **Description**: Audit storage sizes, implement compression routines, and run benchmarking scripts comparing full profiles vs. delta storage.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 5: Skill Graph & Semantic Representation

#### 5.1 Create skill ontology database
* **Description**: Create graph schema or relational models mapping skills, categories, levels, and domains (e.g. Node.js -> JavaScript -> Backend).
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 5.2 Build semantic skill relationships
* **Description**: Seed database with hierarchical connections, synonyms, and related skill links (e.g. React -> Redux, Next.js).
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 5.3 Implement vector embedding generation
* **Description**: Integrate sentence-transformers or local embedding services (via Ollama or HuggingFace) to generate vector embeddings of skills and profiles.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 5.4 Develop candidate skill scoring system
* **Description**: Write scoring algorithms that assess skill proficiency based on years used, recency, and context of usage in resumes.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 5.5 Create experience weighting models
* **Description**: Implement mathematical decay models that give higher weight to skills used in recent jobs versus historical roles.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 6: Job Posting Management

#### 6.1 Create employer dashboard
* **Description**: Build frontend page for employers to view active jobs, edit listings, and see applicant counts.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 6.2 Develop job creation interface
* **Description**: Implement form fields for job title, description, department, required/optional skills, experience level, salary range, and location.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 6.3 Add job editing and deletion features
* **Description**: Create backend API routes and UI actions to update job listing details or archive/delete listings.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 6.4 Create job requirement templates
* **Description**: Develop predefined templates for common roles (e.g. Frontend Dev, DevOps Eng) to accelerate job creation.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 6.5 Implement job status management
* **Description**: Create job posting states (Draft, Active, Paused, Closed) and integrate status toggle logic on frontend and backend.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 7: AI Candidate Matching Engine

#### 7.1 Develop skill matching algorithms
* **Description**: Write backend matching logic that evaluates overlap, synonym matches, and category-level similarity between candidate skills and job requirements.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 7.2 Create experience matching models
* **Description**: Build duration-based and level-based (Junior, Senior, Lead) comparison logic comparing candidate's historical work experience to job criteria.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 7.3 Implement education and certification matching
* **Description**: Create filters/scorers for specific degrees, educational levels, and professional certifications requested by the employer.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 7.4 Generate candidate ranking scores
* **Description**: Combine skill, experience, and education matches into a unified, normalized match percentage/score (0-100%).
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 7.5 Build recommendation engine
* **Description**: Create query routines in the database to fetch and sort the top N matching candidates for a given job posting.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 7.6 Create explainable matching reports
* **Description**: Generate detailed breakdowns of matches showing *why* a candidate scored high (e.g. "Has 8/10 required skills, has exact target certs") and what is missing.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 8: AI Resume Improvement Assistant

#### 8.1 Detect missing skills
* **Description**: Build comparison logic that identifies key skills present in the target job postings of a field but missing from the candidate's profile.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 8.2 Identify weak resume sections
* **Description**: Create criteria or use Ollama prompts to analyze candidate descriptions for action verbs, impact statements, and missing details.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 8.3 Suggest resume improvements
* **Description**: Generate targeted advice (rephrasing suggestions, formatting improvements) using the local LLM.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 8.4 Recommend certifications and learning resources
* **Description**: Build a recommendation system mapping missing skills to relevant online courses, tutorials, or industry-recognized certifications.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 8.5 Generate role-specific resume suggestions
* **Description**: Provide specific recommendations tailored to a user's target career pathway (e.g., transitioning from QA to Developer).
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 8.6 Track improvement history
* **Description**: Design DB schemas and dashboard charts to record changes in resume quality scores over time.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 9: Employer Feedback Learning System

#### 9.1 Create hiring feedback interface
* **Description**: Build form components on the employer applicant view allowing them to score candidates (e.g., Shortlisted, Rejected) and log qualitative feedback.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 9.2 Collect reasons for candidate selection/rejection
* **Description**: Provide predefined tags (e.g. "Strong skill match", "Lacks React experience") and free-text inputs to capture detailed rejection/selection reasons.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 9.3 Store hiring outcome data
* **Description**: Model the database tables to record historical matching parameters, employer decisions, and feedback scores for training/refinement.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 9.4 Develop feedback analysis engine
* **Description**: Write analytical scripts to process feedback tags and text to identify patterns in employer preferences.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 9.5 Update matching weights using feedback
* **Description**: Implement a local feedback loop (e.g., reinforcement learning or weight updates) that adjusts skill/experience priorities for future matching runs based on what the employer preferred.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 9.6 Generate recruitment analytics
* **Description**: Aggregate feedback data to output performance metrics (like placement rate, false positive rate) of the matching engine.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 10: Search & Recommendation Engine

#### 10.1 Create semantic candidate search
* **Description**: Build search queries leveraging vector embeddings (e.g. using `pgvector` or a vector store) to find candidates by semantic intent instead of raw keywords.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 10.2 Implement advanced filtering
* **Description**: Develop filter controls (location, salary expectation, minimum experience, specific skills, education) overlaying semantic search results.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 10.3 Build recommendation APIs
* **Description**: Define high-performance API endpoints to fetch recommended candidates for jobs, and recommended jobs for candidates.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 10.4 Optimize search performance
* **Description**: Create database indexes, implement caching layers (Redis), and benchmark query response times for large candidate pools.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 10.5 Create personalized job recommendations
* **Description**: Personalize job listings shown to candidates based on their search history, profile updates, and historical applications.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 11: Analytics Dashboard

#### 11.1 Candidate analytics
* **Description**: Build candidate-facing graphs displaying profile views, search appearances, and application status funnels.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 11.2 Employer hiring analytics
* **Description**: Develop employer dashboard metrics showing views per posting, top applicant sources, time-to-hire, and matching distributions.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 11.3 Skill demand trends
* **Description**: Create aggregated backend tracking and frontend charts showing the most requested skills by industry and region.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 11.4 Resume improvement statistics
* **Description**: Track candidate progress, showing correlation between fixing suggested weak spots and increases in candidate match scores.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 11.5 Recruitment success metrics
* **Description**: Design reports tracking platform success rates, interview conversion ratios, and overall system usage statistics.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 12: API Development

#### 12.1 Design REST APIs
* **Description**: Formulate a consistent RESTful API routing structure for users, profiles, resumes, jobs, matches, and feedback.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 12.2 Create API documentation
* **Description**: Set up Swagger/OpenAPI interactive documentation (or Redoc) auto-generated from backend routes and schemas.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 12.3 Implement authentication middleware
* **Description**: Develop auth guards validating bearer tokens, handling token expiration, and appending current user payload to HTTP requests.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 12.4 Add API versioning
* **Description**: Establish API versioning in the routing paths (e.g., `/api/v1/...`) to ensure compatibility as endpoints evolve.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 12.5 Create testing endpoints
* **Description**: Write dedicated sandbox endpoints or Mock APIs for mock resume uploads, LLM testing, and validation assertions.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 13: Frontend Development

#### 13.1 Landing page
* **Description**: Create an interactive, visually stunning landing page describing platform features for candidates and employers.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 13.2 Candidate dashboard
* **Description**: Implement candidate control panel displaying resume uploads, improvement recommendations, and matched job lists.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 13.3 Employer dashboard
* **Description**: Implement employer view with jobs listing, applicant pipeline, and candidate matching scores.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 13.4 Resume analysis interface
* **Description**: Build step-by-step upload screens showing live parsing progress, extracted details review, and optimization tips.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 13.5 Job management pages
* **Description**: Create job detail pages, candidate review workflows, and employer job creation wizard.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 13.6 Analytics visualizations
* **Description**: Integrate charting libraries (e.g. Chart.js, Recharts) to render dashboards for candidate and employer analytics.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 13.7 Responsive UI design
* **Description**: Ensure the frontend design is fully responsive across mobile, tablet, and desktop viewports using CSS media queries.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 14: Database & Infrastructure

#### 14.1 Database schema design
* **Description**: Define primary key structures, foreign keys, relationships, and seed data for relational database (PostgreSQL).
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 14.2 Resume storage optimization
* **Description**: Implement blob chunking, compression, and secure binary storage models for high volumes of document storage.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 14.3 Vector database integration
* **Description**: Configure pgvector index extensions (e.g., HNSW or IVFFlat) to support high-performance similarity search on skill and resume vectors.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 14.4 Backup and recovery system
* **Description**: Write automated scripts to perform regular DB dumps, encrypt backups, and upload backups to secure cold storage.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 14.5 Performance optimization
* **Description**: Analyze slow queries, configure appropriate indexes, and optimize connection pooling for backend services.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

---

### Module 15: Security & Privacy

#### 15.1 Data encryption
* **Description**: Enforce TLS/HTTPS protocols in transit and AES-256 encryption on sensitive candidate database columns (PII) at rest.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 15.2 Secure file storage
* **Description**: Implement pre-signed URLs or download authorization middleware for accessing resumes, blocking direct public downloads.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 15.3 Privacy controls
* **Description**: Allow candidates to set profiles to "Public", "Anonymous" (removing name/contact details), or "Private".
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 15.4 Audit logging
* **Description**: Record security logs of user actions (login attempts, profile downloads, changes to access rights) to track data operations.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 15.5 Access monitoring
* **Description**: Set up rate limiting and firewalls (e.g. CORS restrictions, IP tracking) to prevent scraping of candidate data.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`

#### 15.6 GDPR and compliance preparation
* **Description**: Develop "Request Data Archive" and "Account Deletion" features to comply with Right to Be Forgotten and data portability rules.
* **Role 1 (Feature Adder)**: *[Enter name/handle]*
* **Role 2 (Bug Fixer / Verifier)**: *[Enter name/handle]*
* **Status**: `[Open]`
