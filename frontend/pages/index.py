import reflex as rx
from frontend.components.nav_bar import navbar
from frontend.components.inputs import query_section, schema_section
from frontend.components.results import result_display
from frontend.components.buttons import button_sql, button_token
from frontend.state.app_state import AppState


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
                    rx.vstack(
                        query_section(),
                        spacing="4",
                        width="100%"
                    ),
                    rx.vstack(
                        schema_section(),
                        spacing="4",
                        width="100%"
                    ),
                    # responsive: 1 columna en celulares, 2 en pantallas mas grandes
                    columns=rx.breakpoints(initial="1", lg="2"), 
                    spacing="6",
                    width="100%"
                ),
                rx.grid(
                    rx.vstack(
                        button_sql(),
                        spacing="4",
                        width="100%"
                    ),
                    rx.vstack(
                        button_token(),
                        spacing="4",
                        width="100%"
                    ),
                    # responsive: 1 columna en celulares, 2 en pantallas mas grandes
                    columns=rx.breakpoints(initial="1", lg="2"), 
                    spacing=rx.breakpoints(initial="3", lg="6"),
                    width="100%"
                ),
                rx.cond(
                    AppState.is_over_limit,
                    rx.callout(
                        rx.text(
                            rx.text.strong("Nota: "), 
                            "El modelo solo recibirá los primeros 512 tokens. Lo que sobra no lo tendrá en cuenta."
                        ),
                        icon="triangle-alert",
                        color_scheme="red",
                        variant="soft",
                        width="100%",           
                        margin_top="1rem"       
                    )
                ),
                # seccion de resultados, solo si hay resultado
                result_display(),
                padding_y="3rem",
                width="100%",
                max_width="1400px"
            ),
            size="4", 
            width="100%"
        ),
        min_height="100vh",
        bg=rx.color("gray", 1)
    )