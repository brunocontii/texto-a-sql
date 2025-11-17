import reflex as rx
import texto_a_sql.styles.styles as styles
import texto_a_sql.styles.colors as colors

def area_component() -> rx.Component:
    return rx.text_area(
            placeholder="SELECT * FROM productos WHERE precio > 1000;",
            rows="4",
            width="80%",
            bg=colors.Color.BACKGROUND.value,
            radius="large",
            padding=styles.Size.DEFAULT.value,
            font_size=["0.95em", "1em", "1.05em"],
            read_only=True,
    )
    