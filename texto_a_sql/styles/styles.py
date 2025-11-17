import reflex as rx
from enum import Enum
from .colors import Color as color, TextColor as text_color
from .fonts import Font as Font, FontWeight as FontWeight


class Size(Enum):
    ZERO = "0px !important"
    SMALL="0.5em"
    DEFAULT="1em"
    MEDIUM="2em"
    LARGE="4em"


navbar_title_style = dict(
    font_family= Font.LOGO.value,
    font_weight= FontWeight.MEDIUM.value,
    font_size=Size.MEDIUM.value,
)
