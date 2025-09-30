from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import StoryRequest, StoryResponse, ExplainRequest
from core.generator import StoryGenerator

app = FastAPI(title="AI Story Generator and Teaching Assistant", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

generator = StoryGenerator()

@app.get("/health")
def health() -> dict:
    return {"status": "ok"}

@app.post("/generate_story", response_model=StoryResponse)
def generate_story(req: StoryRequest) -> StoryResponse:
    story_text = generator.generate_story(
        prompt=req.prompt,
        genre=req.genre,
        tone=req.tone,
        length=req.length,
        audience=req.audience,
        perspective=req.perspective,
    )
    return StoryResponse(story=story_text)

@app.post("/explain_concept")
def explain_concept(req: ExplainRequest) -> dict:
    story_text = generator.explain_concept(
        concept=req.concept,
        tone=req.tone,
        length=req.length,
        audience=req.audience,
        complexity=req.complexity,
        perspective=req.perspective,
    )
    return {"story": story_text}
