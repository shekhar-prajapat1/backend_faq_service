```markdown
# Backend FAQ Service

## Objective
This project is designed to store and manage FAQs with multi-language translation support using **Node.js, Express, MongoDB, Redis, and Google Translate API**.

## Features
- REST API for managing FAQs
- Multi-language translation using Google Translate API
- Redis caching for improved performance
- WYSIWYG editor integration
- Unit testing and linting
- Docker support (Bonus)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/backend_faq_service.git
   cd backend_faq_service
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB and Redis:
   ```sh
   sudo service mongod start
   redis-server
   ```
4. Start the server:
   ```sh
   node server.js
   ```

## API Usage
### Fetch FAQs
- Default (English):
  ```sh
  curl http://localhost:8000/api/faqs/
  ```
- Fetch in Hindi:
  ```sh
  curl http://localhost:8000/api/faqs/?lang=hi
  ```
- Fetch in Bengali:
  ```sh
  curl http://localhost:8000/api/faqs/?lang=bn
  ```

### Add a New FAQ
```sh
curl -X POST http://localhost:8000/api/faqs/ \
     -H "Content-Type: application/json" \
     -d '{"question": "What is Node.js?", "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."}'
```

## Testing
Run unit tests using:
```sh
npm test
```

## Contribution Guidelines
- Follow **PEP8/ES6** coding standards.
- Use Git for version control with meaningful commit messages.
- Ensure all features are covered with **unit tests**.

## Deployment
To deploy with Docker:
```sh
docker-compose up --build
```

## Author
Developed by **Shekhar Prajapat** 🚀
