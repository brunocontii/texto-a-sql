import reflex as rx

def theme_toggle() -> rx.Component:
    """
    Botón para cambiar el tema.
    """
    return rx.button(
        # icono de sol
        rx.icon(
            tag="sun",
            size=20,
            # rx.cond verifica el modo de color actual para aplicar transformaciones
            transform=rx.cond(rx.color_mode == "dark", "rotate(90deg) scale(0)", "rotate(0deg) scale(1)"),
            opacity=rx.cond(rx.color_mode == "dark", "0", "1"),
            transition="all 0.5s ease-in-out",
            position="absolute",
            color=rx.color("gray", 12),
        ),
        # icono de luna
        rx.icon(
            tag="moon",
            size=20,
            # rx.cond verifica el modo de color actual para aplicar transformaciones
            transform=rx.cond(rx.color_mode == "light", "rotate(-90deg) scale(0)", "rotate(0deg) scale(1)"),
            opacity=rx.cond(rx.color_mode == "light", "0", "1"),
            transition="all 0.5s ease-in-out",
            position="absolute",
            color=rx.color("gray", 12),
        ),
        variant="ghost",
        size="3",
        on_click=rx.toggle_color_mode, # evento nativo de reflex para cambiar tema
        position="relative",
        radius="full",
        width="40px",
        height="40px",
        padding="0",
        cursor="pointer",
    )

def navbar() -> rx.Component:
    """
    Barra de navegación.
    """
    return rx.box(
        rx.hstack(
            # lado izquierdo: logo y titulo
            rx.hstack(
                rx.center(
                    rx.icon(tag="database", color="white", size=20),
                    width="40px",
                    height="40px",
                    bg=rx.color("accent", 9),
                    border_radius="12px",
                    display="flex",
                    justify_content="center",
                    align_items="center",
                ),
                rx.vstack(
                    rx.text("SQL AI", weight="bold", size="4", line_height="1"),
                    rx.text("Natural to SQL", size="1", color_scheme="gray"),
                    spacing="0",
                    align_items="start",
                ),
                spacing="3",
                align_items="center",
            ),
            
            # lado derecho: cambio de tema
            theme_toggle(),
            
            # estilos del contenedor interno
            width="100%",
            max_width="1280px", 
            margin_x="auto",    
            height="4rem",      
            justify="between",
            align_items="center",
            padding_x="1rem",   
        ),
        
        # estilos del navbar
        width="100%",
        border_bottom="1px solid var(--gray-3)",
        bg=rx.color("gray", 1), 
        position="sticky",
        top="0",
        z_index="50",
        backdrop_filter="blur(8px)",
    )