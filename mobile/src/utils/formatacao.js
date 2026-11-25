export function formatarNota(nota) {

    if(!nota) return 'Sem nota'

    return `★ ${nota.toFixed(1).replace('.', ',')}`
}

export function formatarDuracao(minutos) {
    if(!minutos) return null
    const horas = Math.floor(minutos/60)
    const mins = minutos % 60
    if (horas > 0 && mins > 0) return `${horas}h ${mins}min`
    if (horas > 0) return `${horas}h`
    return `${mins}min`
}