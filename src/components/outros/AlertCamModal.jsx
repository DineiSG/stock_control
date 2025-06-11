import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import styles from "../styles/StylesModal.module.css";

const AlertCamModal = () => {
  const [mensagens, setMensagens] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [stompClient, setStompClient] = useState(null);


  // Desbloquiar áudio ao clicar na página
  // Isso é necessário para que o áudio possa ser reproduzido sem bloqueio do navegador
  useEffect(() => {
    const desbloquearAudio = () => {
      const audio = document.getElementById("alertSound");
      if (audio) {
        audio.play().then(() => {
          audio.pause();
          audio.currentTime = 0;
          console.log("Áudio desbloqueado com sucesso.");
        }).catch((err) => {
          console.warn("Falha ao desbloquear o áudio:", err);
        });
      }
      document.removeEventListener("click", desbloquearAudio);// Remove o ouvinte após a interação
    };

    document.addEventListener("click", desbloquearAudio);// Aguarda o primeiro clique do usuário

    // Solicitar permissão de notificação (opcional)
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8092/ws");// Conecta ao endpoint SockJS
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,// Reconexão automática após 5s
      heartbeatIncoming: 4000,// Heartbeat de entrada
      heartbeatOutgoing: 4000,// Heartbeat de saída
    });

    // Ao conectar com sucesso
    client.onConnect = () => {
      console.log("Conectado ao WebSocket");

      client.subscribe("/topic/mensagens", (mensagem) => {
        const novaMsg = mensagem.body;
        setMensagens((msgs) => [...msgs, novaMsg]);// Armazena a nova mensagem
        setModalAberto(true);// Abre o modal


        //Piscar título da aba do navegador
        let originalTitle = document.title;
        let interval;

        function startTitleBlink(mensagem = "🔔 Atenção!") {
          interval = setInterval(() => {
            document.title =
              document.title === originalTitle ? mensagem : originalTitle;
          }, 1000);
        }

        startTitleBlink(mensagem.body);

        // Para o piscar do título quando a aba for focada
        function stopTitleBlink() {
          clearInterval(interval);
          document.title = originalTitle;
        }

        // Adiciona evento de foco na aba
        document.addEventListener("visibilitychange", () => {
          if (!document.hidden) {
            stopTitleBlink();
          }
        });

        // Som de alerta
        const audio = document.getElementById("alertSound");
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch((err) => {
            console.warn( "Som bloqueado até que o usuário interaja com a página.", err ); // O navegador pode bloquear o som até que o usuário interaja com a página
          });
        }

        // Notificação (se permitido)
        if (Notification.permission === "granted") {
          new Notification("Auto Control", {
            body: mensagem.body,
            icon: "https://img.icons8.com/3d-fluency/94/warning-shield.png",
          });
        }
      });
    };

    // Em caso de erro na conexão
    // Exibe mensagem de erro no console
    client.onStompError = (frame) => {
      console.error("Erro na conexão Stomp:", frame.headers["message"]);
      console.error("Detalhes adicionais:", frame.body);
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  // Função para fechar o modal e limpar as mensagens
  const fecharModal = () => {
    setModalAberto(false);
    setMensagens([]);
  };

  return (
    <>
      {/* Elemento de som */}
      <audio id="alertSound" src="/alerta.mp3" preload="auto" />

      {/* Modal de alerta */}
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
              {/* Botão para fechar o modal */}
              <button
                onClick={fecharModal}
                className={styles.btn_fechar_rodape}
              >
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
