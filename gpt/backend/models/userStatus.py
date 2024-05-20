from enum import Enum

class UserStatus(str, Enum):
    active = "active"
    not_active = "not_active"