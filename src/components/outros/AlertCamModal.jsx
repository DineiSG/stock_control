import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import styles from "../styles/StylesModal.module.css";

const AlertCamModal = () => {
  const [mensagens, setMensagens] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  // Conectar ao WebSocket quando o componente for montado
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("Permissão de notificação negada.");
        }
      });
    }
    // Criar conexão WebSocket
    const socket = new SockJS("http://localhost:8092/ws"); // Ajuste para o endereço do seu servidor
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Configurar o que acontece quando conectar
    client.onConnect = () => {
      console.log("Conectado ao WebSocket");

      // Inscrever-se no tópico de mensagens
      client.subscribe("/topic/mensagens", (mensagem) => {
        const novaMsg = mensagem.body;
        setMensagens((msgs) => [...msgs, novaMsg]);

        // Abrir o modal automaticamente quando receber uma mensagem
        setModalAberto(true);

        // Exibir notificação se estiver em outra aba
        if (Notification.permission === "granted") {
          new Notification("Auto Control", {
            body: mensagem.body,
            icon: "https://img.icons8.com/3d-fluency/94/warning-shield.png",
          });
        }
      });
    };

    // Configurar o que acontece em caso de erro
    client.onStompError = (frame) => {
      console.error("Erro na conexão Stomp:", frame.headers["message"]);
      console.error("Detalhes adicionais:", frame.body);
    };

    // Ativar a conexão
    client.activate();
    setStompClient(client);

    // Limpar a conexão quando o componente for desmontado
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  // Função para fechar o modal
  const fecharModal = () => {
    setModalAberto(false);
    setMensagens([]); // Limpa as mensagens ao fechar o modal
  };

  return (
    <>
      {/* Botão para abrir o modal manualmente */}
      {/*<button onClick={() => setModalAberto(true)} className={styles.btn_abrir_modal}>
                Ver Mensagens ({mensagens.length})
            </button>*/}
      {/* Modal */}
      {modalAberto && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_conteudo}>
            <div className={styles.modal_cabecalho}>
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/warning-shield.png"
                alt="warning-shield"
              />
            </div>
            <div className={styles.modal_corpo}>
              {mensagens.length > 0 ? (
                <ul className={styles.lista_mensagens}>
                  {mensagens.map((msg, index) => (
                    <li key={index} className={styles.item_mensagem}>
                      {msg}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.sem_mensagens}>
                  Nenhuma mensagem recebida ainda.
                </p>
              )}
            </div>
            <div className={styles.modal_rodape}>
              <button
                onClick={fecharModal}
                className={styles.btn_fechar_rodape}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertCamModal;
