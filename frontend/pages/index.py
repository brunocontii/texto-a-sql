import reflex as rx
from frontend.components.nav_bar import navbar
from frontend.components.inputs import query_section, schema_section
from frontend.components.results import result_display

@rx.page(title="SQL AI - Natural to SQL")
def index() -> rx.Component:
    return rx.box(
        # barra de navegacion
        navbar(),
        rx.container(
            rx.vstack(
                # titulo principal y subtitulo
                rx.center(
                    rx.vstack(
                        rx.badge(
                            rx.icon(tag="sparkles", size=12),
                            "Traductor de Lenguaje Natural a SQL",
                            color_scheme="blue",
                            radius="full",
                            padding_x="3",
                            padding_y="1",
                            variant="soft"
                        ),
                        rx.heading(
                            "Consulta tu base de datos ",
                            rx.text.span("en lenguaje natural", color="var(--blue-9)"),
                            size="8",
                            text_align="center",
                            weight="bold"
                        ),
                        rx.text(
                            "Transforma tus preguntas en consultas SQL válidas usando inteligencia artificial",
                            size="4",
                            color_scheme="gray",
                            text_align="center",
                            max_width="600px"
                        ),
                        spacing="4",
                        align_items="center",
                        margin_bottom="4rem"
                    ),
                    width="100%"
                ),
                
                # grid principal de entradas
                rx.grid(
                    query_section(),
                    schema_section(),
                    # responsive: 1 columna en celulares, 2 en pantallas mas grandes
                    columns=rx.breakpoints(initial="1", lg="2"), 
                    spacing="6",
                    width="100%"
                ),
                
                # seccion de resultados, solo si hay resultado
                result_display(),

                padding_y="3rem",
                max_width="1200px"
            ),
        ),
        min_height="100vh",
        bg=rx.color("gray", 1)
    )