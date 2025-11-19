import reflex as rx
import texto_a_sql.styles.styles as styles
import texto_a_sql.styles.colors as colors
import texto_a_sql.components.special_button as eb
from texto_a_sql.state.InputState import InputState


def input_component() -> rx.Component:
    return rx.box(
        rx.text_area(
            placeholder="Ejemplo: mostrar los productos con precio mayor a 1000",
            value=InputState.user_text,
            on_change=InputState.set_user_text,
            rows="1",
            resize="none",
            size="2",
            radius="full",
            padding_top=styles.Size.SMALL.value,
            padding_bottom="3em",
            padding_x=styles.Size.SMALL.value,
            overflow_x="auto",
            white_space="nowrap",
            width="100%",
            font_size=["0.95em", "1em", "1.05em"],
            _placeholder={"font_size": ["0.95em", "1em", "1.05em"]},
            bg=colors.Color.BACKGROUND.value,
        ),
        eb.special_button("Enviar", icono="send-horizontal"),
        position="relative",
        width="80%",   
    )