from app.core.database import SessionLocal
from app.models.admin import Admin
from app.core.security import hash_password

db = SessionLocal()

admin = Admin(
    name="Administrator",
    email="admin@visiondholera.com",
    password_hash=hash_password("Admin@123")
)

db.add(admin)
db.commit()

print("Admin created successfully!")