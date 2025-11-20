import reflex as rx
from texto_a_sql.state.SchemaState import SchemaState
import texto_a_sql.styles.colors as colors
import texto_a_sql.styles.styles as styles


def column_input(table, column, is_last: bool):
    return rx.box(
        rx.input(
            placeholder="Column Name",
            value=column.value,
            bg = colors.Color.BACKGROUND.value,
            on_change=lambda v: SchemaState.update_column_value(table.id, column.id, v),
            width="10em",
            size="2",
            radius="medium",
        ),
        # Botón de eliminar (solo visible en hover)
        rx.icon_button(
            rx.icon(tag="x", size=14),
            on_click=lambda: SchemaState.remove_column(table.id, column.id),
            size="1",
            radius="full",
            position="absolute",
            top=styles.Size.NEGATIVE_SMALL.value,
            right=styles.Size.NEGATIVE_SMALL.value,
            bg="red",
            color="white",
            cursor="pointer",
            opacity="0",
            _hover={"opacity": "1"},
            transition="opacity 0.2s",
            class_name="delete-btn",
        ),
        position="relative",
        flex_shrink="0", 
        _hover={
            "& .delete-btn": {
                "opacity": "1"
            }
        },
    )


def schema_row(table):
    return rx.vstack(
        rx.box(
            rx.hstack(
                # Input de Schema Name con botón eliminar
                rx.box(
                    rx.input(
                        placeholder="Schema Name",
                        value=table.schema_name,
                        bg = colors.Color.BACKGROUND.value,
                        on_change=lambda v: SchemaState.update_schema_name(table.id, v),
                        width="10em",
                        size="2",
                        radius="medium",
                    ),
                    # Botón de eliminar tabla
                    rx.icon_button(
                        rx.icon(tag="x", size=14),
                        on_click=lambda: SchemaState.remove_table(table.id),
                        size="1",
                        radius="full",
                        position="absolute",
                        top=styles.Size.NEGATIVE_SMALL.value,
                        right=styles.Size.NEGATIVE_SMALL.value,
                        bg="red",
                        color="white",
                        cursor="pointer",
                        opacity="0",
                        _hover={"opacity": "1"},
                        transition="opacity 0.2s",
                        class_name="delete-btn-schema",
                    ),
                    position="relative",
                    flex_shrink="0",
                    _hover={
                        "& .delete-btn-schema": {
                            "opacity": "1"
                        }
                    },
                ),

                # Todas las columnas (sin botón + individual)
                rx.foreach(
                    table.columns,
                    lambda col: column_input(table, col, False)
                ),

                # UN SOLO BOTÓN + al final de todas las columnas
                rx.icon_button(
                    rx.icon(tag="plus", size=16),
                    on_click=lambda: SchemaState.add_column(table.id),
                    variant="outline",
                    size="2",
                    bg=colors.Color.BOTONES.value,
                    color=colors.TextColor.HEADER.value,
                    cursor="pointer",
                    flex_shrink="0",
                    _hover={"bg": "#12cbe4"},
                ),

                spacing="2",
                #width="100%",
                align="center",
                flex_wrap="nowrap",
            ),
            width="100%",
            overflow_x="auto",
            overflow_y="visible",
            padding_y=styles.Size.SMALL.value,
        ),
        width="100%",
        spacing="2",
    )


def schema_builder():
    return rx.vstack(

        # LISTA DE TABLAS
        rx.foreach(
            SchemaState.tables,
            lambda table: schema_row(table)
        ),

        rx.button(
            "+ Add Table",
            on_click=SchemaState.add_table,
            variant="surface",
            size="2",
            width="10em",
            bg=colors.Color.BOTONES.value,
            color=colors.TextColor.HEADER.value,
            cursor="pointer",
            _hover={"bg": "#12cbe4"},
        ),

        spacing="3",
        width="80%",
    )