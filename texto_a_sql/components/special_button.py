import reflex as rx
import texto_a_sql.styles.styles as styles
import texto_a_sql.styles.colors as colors

def special_button(title: str, icono: str, on_click=None) -> rx.Component:
    return rx.button(
        rx.icon(
            tag=icono,
        ),
        on_click=on_click,
        size="1",
        radius="medium",
        bg=colors.Color.BOTONES.value,
        color=colors.TextColor.HEADER.value,
        cursor="pointer",
        padding_y="1.5em",
        _hover={
            "bg": "#12cbe4",
        },
        position="absolute",
        bottom=styles.Size.SMALL.value,
        right=styles.Size.SMALL.value,
        display="flex",
        align_items="center",
        justify_content="center",
    )