// adjust model, returning new one if any change occurred
export function move(model, direction) {
    model.move(direction)
    return model
}

export function key(model) {
    model.key()
    return model
}
