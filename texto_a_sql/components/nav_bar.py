import reflex as rx
import texto_a_sql.styles.styles as styles
import texto_a_sql.styles.colors as colors


def navbar() -> rx.Component:
    return rx.hstack(
        #rx.link(
            rx.box(
                rx.fragment(
                    rx.text("Generador de SQL", as_="span", font_weight="bold", color=colors.TextColor.HEADER.value)            
                ),
                style=styles.navbar_title_style,
                padding_x=styles.Size.SMALL.value,
            ),
            #href=rt.Routes.INDEX.value
        #),
        # fb.float_button(
        #     icon="python-brands-solid-full.svg",
        #     href="https://github.com/erichvollenweider"
        # ),
        position="sticky",
        bg=colors.Color.BACKGROUND.value,
        padding_x=styles.Size.DEFAULT.value,
        padding_y=styles.Size.SMALL.value,
        z_index=999,
        top="0"
    )

