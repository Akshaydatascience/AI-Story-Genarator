# AI Story Generator & Teaching Assistant

A modern web application that combines creative storytelling with educational content generation using Google's Gemini AI.

## Features

### 🎭 Story Generator
- Generate creative stories based on custom prompts
- Multiple genres: Fantasy, Sci-Fi, Mystery, Adventure, Comedy, Romance, Horror
- Customizable tone, length, audience, and perspective
- Real-time story generation with AI

### 🎓 Educational Mode
- Explain complex concepts through engaging stories
- Age-appropriate content for different audiences
- Multiple complexity levels (Simple, Moderate, Advanced)
- Narrative-driven learning approach

## Quick Start

### Prerequisites
- Python 3.8+
- Google Gemini API key

### Backend Setup
1. **Activate virtual environment:**
   ```bash
   aistory/Scripts/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up API key:**
   - Create `storyapi.env` file
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Start the server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Usage
1. **Open the application:**
   - Navigate to `index.html` in your browser
   - Or run: `start index.html` (Windows)

2. **Generate Stories:**
   - Select "Story Generator" mode
   - Enter your story prompt
   - Customize genre, tone, length, and audience
   - Click "Generate Story"

3. **Educational Mode:**
   - Select "Educational Mode"
   - Enter a concept to explain
   - Set complexity and target audience
   - Click "Explain Concept"

## API Endpoints

### Story Generation
```http
POST /generate_story
Content-Type: application/json

{
  "prompt": "A dragon who loves baking",
  "genre": "fantasy",
  "tone": "humorous",
  "length": "short",
  "audience": "kids",
  "perspective": "third-person"
}
```

### Concept Explanation
```http
POST /explain_concept
Content-Type: application/json

{
  "concept": "photosynthesis",
  "tone": "child-friendly",
  "length": "short",
  "audience": "10-year-old",
  "complexity": "simple",
  "perspective": "third-person"
}
```

## Frontend Features

### 🎨 Modern UI
- Responsive design for all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Intuitive form controls

### ⚡ User Experience
- Real-time form validation
- Loading indicators
- Error handling with user-friendly messages
- Copy to clipboard functionality
- Auto-save form data
- Keyboard shortcuts (Ctrl+Enter to submit, Escape for new story)

### 🔧 Advanced Features
- Mode switching between Story and Educational
- Regenerate content with same parameters
- Form data persistence
- Responsive design for mobile devices

## File Structure

```
Ai-story/
├── main.py                 # FastAPI application
├── models.py              # Pydantic data models
├── core/
│   ├── generator.py       # Gemini AI integration
│   └── prompt_builders.py # Prompt construction
├── requirements.txt       # Python dependencies
├── storyapi.env          # Environment variables
├── index.html            # Frontend HTML
├── styles.css            # CSS styling
├── script.js             # JavaScript functionality
└── README.md             # This file
```

## Usage Examples

### Story Generation Examples
- **Fantasy:** "A wizard who's afraid of magic"
- **Sci-Fi:** "A robot learning to dream"
- **Mystery:** "A detective who can see the past"
- **Adventure:** "A treasure hunter in a magical forest"

### Educational Examples
- **Science:** "photosynthesis", "gravity", "water cycle"
- **History:** "democracy", "renaissance", "industrial revolution"
- **Technology:** "artificial intelligence", "blockchain", "quantum computing"

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Keyboard Shortcuts
- `Ctrl/Cmd + Enter`: Submit form
- `Escape`: Start new story
- `Tab`: Navigate between form fields

## Troubleshooting

### Common Issues
1. **API Key Error:** Ensure your Gemini API key is correctly set in `storyapi.env`
2. **CORS Issues:** Make sure the backend is running on `http://localhost:8000`
3. **Module Not Found:** Activate the virtual environment and install dependencies

### Getting Help
- Check the browser console for JavaScript errors
- Verify the backend server is running
- Ensure all dependencies are installed

## Future Enhancements
- User accounts and story saving
- Story editing and continuation
- Voice narration
- Image generation integration
- Collaborative story creation
- Export to PDF/ePub

## License
This project is open source and available under the MIT License.

