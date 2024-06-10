import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
    //pegando os parametros da URL com o useLocation
    const {search } = useLocation()

    //Buscando o parametro especificado na busca
    return useMemo(()=>new URLSearchParams(search),[search])
}