import reflex as rx
import texto_a_sql.components.nav_bar as nb
import texto_a_sql.styles.colors as colors
import texto_a_sql.components.input_component as ic
import texto_a_sql.components.area_component as ac
import texto_a_sql.styles.styles as styles

@rx.page(
    title= "Texto a SQL - Generador de Consultas SQL desde Texto Natural"
)

def index() -> rx.Component:
    return rx.box(
        nb.navbar(),
        rx.divider(
            size="4",  # Grosor de la línea
            color_scheme="gray",  # Color
            width="100%",
        ),
        rx.center(
            rx.vstack(
                rx.text(
                    "Escribí una consulta en lenguaje natural:",
                    font_size=["1em", "1.1em", "1.2em"],
                    text_align="center",
                    width="100%",
                ),
                ic.input_component(),
                ac.area_component(),
                spacing="4",
                width=["95%", "80%", "60%"],
                max_width="1000px",
                align="center",
            ),
            min_height="100vh",
            bg=colors.Color.BACKGROUND.value,
            width="100%",
        ),
    )