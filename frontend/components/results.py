import reflex as rx
from frontend.state.app_state import AppState

def result_display():
    """
    Muestra el resultado SQL generado solo si existe un resultado.
    """
    return rx.cond(
        AppState.result != "",
        rx.card(
            rx.vstack(
                # header de la tarjeta con titulo y boton de copiar
                rx.hstack(
                    rx.hstack(
                        rx.center(
                            rx.icon(tag="circle-check", size=16, color="var(--green-9)"),
                            width="32px", height="32px",
                            bg="var(--green-3)", border_radius="8px"
                        ),
                        rx.vstack(
                            rx.heading("Resultado SQL", size="3"),
                            rx.text("Tu consulta SQL generada", size="2", color_scheme="gray"),
                            spacing="1",
                            align_items="start"
                        ),
                    ),
                    # boton de copiar
                    rx.button(
                        # contenido del boton cambia si se ha copiado o no
                        rx.cond(
                            AppState.is_copied,
                            rx.icon(tag="check", size=14, color="var(--green-9)"),
                            rx.icon(tag="copy", size=14)
                        ),
                        rx.cond(AppState.is_copied, "¡Copiado!", "Copiar"),
                        
                        variant="outline",
                        size="1",
                        on_click=[
                            rx.set_clipboard(AppState.result),
                            AppState.handle_copy # type: ignore
                        ],
                        color_scheme=rx.cond(AppState.is_copied, "green", "gray"),
                        cursor="pointer",
                        min_width="80px"
                    ),
                    justify="between",
                    width="100%",
                    align_items="center"
                ),
                
                # caja del resultado SQL
                rx.box(
                    rx.code(
                        AppState.result, 
                        variant="ghost", 
                        font_family="monospace",
                        background="transparent",
                        white_space="pre-wrap", 
                        word_break="break-word",
                    ),
                    padding="1.5em",
                    bg="var(--gray-3)",
                    border_radius="12px", 
                    width="100%",
                    border="1px solid var(--gray-4)",
                ),
                spacing="4",
                width="100%"
            ),
            width="100%",
            border="2px solid var(--blue-4)",
            margin_top="2rem",
            animation="fadeIn 0.5s ease-in-out"
        )
    )