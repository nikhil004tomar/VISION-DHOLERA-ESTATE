from pydantic import BaseModel, EmailStr

class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str