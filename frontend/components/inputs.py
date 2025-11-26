import reflex as rx
from frontend.state.app_state import AppState

def query_section():
    """
    Tarjeta de entrada de la consulta en lenguaje natural.
    """
    return rx.card(
        rx.vstack(
            # header de la tarjeta y titulo
            rx.hstack(
                rx.center(
                    rx.icon(tag="sparkles", size=16, color="var(--blue-9)"),
                    width="32px", height="32px",
                    bg="var(--blue-3)", border_radius="8px"
                ),
                rx.vstack(
                    rx.heading("Tu Consulta", size="3"),
                    rx.text("Escribe tu pregunta en lenguaje natural", size="2", color_scheme="gray"),
                    spacing="1",
                    align_items="start"
                ),
                spacing="2",
                align_items="center",
                width="100%"
            ),
            # area de texto y boton
            rx.text_area(
                placeholder=AppState.query_placeholder,
                value=AppState.query,
                on_change=AppState.set_query, # type: ignore
                min_height="200px",
                font_family="monospace",
                size="2",
                resize="none",
                width="100%"
            ),
            # boton para generar SQL
            rx.button(
                rx.cond(AppState.is_loading, "Generando SQL...", "Generar SQL"),
                on_click=AppState.handle_generate, # type: ignore
                loading=AppState.is_loading,
                disabled=~AppState.is_form_valid,
                width="100%",
                size="3",
                variant="solid",
                cursor="pointer",
            ),
            spacing="4",
            width="100%"
        ),
        width="100%",
        border="2px solid var(--gray-3)",
        _hover={"border_color": "var(--blue-8)", "transition": "0.3s"}
    )

def schema_section():
    """
    Tarjeta de entrada del esquema.
    """
    return rx.card(
        rx.vstack(
            rx.hstack(
                rx.center(
                    rx.icon(tag="database", size=16, color="var(--gray-11)"),
                    width="32px", height="32px",
                    bg="var(--gray-3)", border_radius="8px"
                ),
                rx.vstack(
                    rx.heading("Schema de la Base de Datos", size="3"),
                    rx.text("Pega aquí la estructura de tus tablas", size="2", color_scheme="gray"),
                    spacing="1",
                    align_items="start"
                ),
                spacing="2",
                align_items="center",
                width="100%"
            ),
            rx.text_area(
                placeholder=AppState.schema_placeholder,
                value=AppState.schema_input,
                on_change=AppState.set_schema_input, # type: ignore
                min_height="200px",
                font_family="monospace",
                size="2",
                resize="none",
                width="100%"
            ),
            spacing="4",
            width="100%"
        ),
        width="100%",
        border="2px solid var(--gray-3)",
        _hover={"border_color": "var(--blue-8)", "transition": "0.3s"}
    )