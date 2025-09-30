from typing import Literal, Optional
from pydantic import BaseModel, Field

Length = Literal["short", "medium", "long"]
Tone = Literal["serious", "humorous", "child-friendly", "academic", "friendly"]
Perspective = Literal["first-person", "third-person", "dialogue"]
Complexity = Literal["simple", "moderate", "advanced"]

class StoryRequest(BaseModel):
    prompt: str = Field(..., description="Theme or seed prompt for the story")
    genre: Optional[str] = Field(default=None, description="Genre like fantasy, sci-fi, mystery")
    tone: Optional[Tone] = Field(default="friendly")
    length: Optional[Length] = Field(default="short")
    audience: Optional[str] = Field(default="general")
    perspective: Optional[Perspective] = Field(default="third-person")

class StoryResponse(BaseModel):
    story: str

class ExplainRequest(BaseModel):
    concept: str = Field(..., description="Academic or technical concept to explain via story")
    tone: Optional[Tone] = Field(default="friendly")
    length: Optional[Length] = Field(default="short")
    audience: Optional[str] = Field(default="general")
    complexity: Optional[Complexity] = Field(default="simple")
    perspective: Optional[Perspective] = Field(default="third-person")
