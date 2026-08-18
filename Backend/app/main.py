from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

# Routers
from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.api.properties import router as property_router
from app.api.inquiries import router as inquiry_router
from app.api.gallery import router as gallery_router

# Models
from app.models.admin import Admin
from app.models.property import Property
from app.models.inquiry import Inquiry
from app.models.gallery import Gallery


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# UPLOAD DIRECTORIES
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

UPLOAD_DIR = BASE_DIR / "uploads"
PROPERTY_UPLOAD_DIR = UPLOAD_DIR / "properties"
GALLERY_UPLOAD_DIR = UPLOAD_DIR / "gallery"

PROPERTY_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)

GALLERY_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)


# ============================================================
# FASTAPI
# ============================================================

app = FastAPI(
    title="Vision Dholera API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://visiondholera.com",
    "https://www.visiondholera.com",
    "https://api.visiondholera.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# ROUTERS
# ============================================================

app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(property_router)
app.include_router(inquiry_router)
app.include_router(gallery_router)


# ============================================================
# STATIC UPLOADS
# ============================================================

# Backend:
#
# Backend/app/uploads/
#
# Browser URL:
#
# http://localhost:8000/uploads/...

app.mount(
    "/uploads",
    StaticFiles(
        directory=str(UPLOAD_DIR)
    ),
    name="uploads",
)


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "Vision Dholera Backend Running 🚀"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "ok"
    }