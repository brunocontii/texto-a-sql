import reflex as rx
from frontend.state.app_state import AppState

def button_sql():
    """
    Sección de botones para copiar resultado o calcular tokens.
    """
    return rx.hstack(
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
    )


def button_token():
    # En móviles: el resultado cae abajo (vstack)
    mobile_view = rx.vstack(
        rx.button(
            rx.cond(AppState.is_calculating_tokens, "Calculando...", "Calcular Tokens"),
            on_click=AppState.handle_calculate_tokens,
            loading=AppState.is_calculating_tokens,
            width="100%",
            size="3",
            variant="solid",
            cursor="pointer",
        ),
        rx.cond(
            AppState.token_count > 0,
            rx.badge(
                rx.icon(tag=rx.cond(AppState.is_over_limit, "triangle-alert", "check")),
                f"{AppState.token_count} / 512 Tokens",
                color_scheme=rx.cond(AppState.is_over_limit, "red", "green"),
                height="2.5rem",
                size="3",
                radius="full",
                justify_content="center",
                width="100%"
            )
        ),
        spacing="4",
        width="100%"
    )

    # En PC: el botón se achica a 60% y el resultado aparece al lado
    desktop_view = rx.flex(
        rx.button(
            rx.cond(AppState.is_calculating_tokens, "Calculando...", "Calcular Tokens"),
            on_click=AppState.handle_calculate_tokens,
            loading=AppState.is_calculating_tokens,
            width=rx.cond(AppState.token_count > 0, "60%", "100%"), 
            size="3",
            variant="solid",
            cursor="pointer",
            transition="width 0.3s ease-in-out"
        ),
        rx.cond(
            AppState.token_count > 0,
            rx.flex(
                rx.badge(
                    rx.icon(tag=rx.cond(AppState.is_over_limit, "triangle-alert", "check")),
                    f"{AppState.token_count} / 512 Tokens",
                    color_scheme=rx.cond(AppState.is_over_limit, "red", "green"),
                    height="2.5rem",
                    size="3",
                    radius="full",
                    justify_content="center",
                    width="100%"
                ),
                width="40%", # Toma el espacio que dejó el botón
                justify="center"
            )
        ),
        direction="row",
        spacing="4",
        width="100%",
        align="center",
    )

    # renderizado final
    return rx.fragment(
        rx.mobile_only(mobile_view, width="100%"),
        rx.tablet_and_desktop(desktop_view, width="100%")
    )