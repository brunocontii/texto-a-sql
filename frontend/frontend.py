import reflex as rx
from frontend.pages.index import index

# estilos globales para transiciones suaves al cambiar de tema
style: dict = {
    "*": {
        "transition": "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out",
    },
}

# inicializacion de la app de reflex
app = rx.App(
    style=style,
    theme=rx.theme(
        appearance="light", 
        has_background=True, 
        radius="large", 
        accent_color="blue"
    ),
    head_components=[
        rx.el.link(
            rel="icon", 
            href="https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
        ),
    ]
)

# agregamos la pagina principal
app.add_page(index)