import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Teclado from '@/components/Teclado';
import Forca from '@/components/Forca';

const palavras = [
  // Palavras fáceis
  'CASA', 'CARRO', 'BOLA', 'MACA', 'BANANA', 'ESCOLA', 'COMPUTADOR',
  'JANELA', 'GATO', 'CACHORRO', 'LIVRO', 'CADERNO', 'CANETA', 'MESA',
  'CADEIRA', 'AMIGO', 'FAMILIA', 'VIAGEM', 'PRAIA', 'MONTANHA', 'RIO',
  'CIDADE', 'PAIS', 'TRABALHO', 'SONHO', 'MUSICA', 'FILME', 'PIZZA',
  'CHOCOLATE', 'SORVETE', 'CAFE', 'AGUA', 'FUTEBOL', 'BASQUETE', 'CORRIDA',
  'AMARELO', 'VERMELHO', 'AZUL', 'VERDE', 'BRANCO', 'PRETO', 'SOL', 'LUA',
  'ESTRELA', 'NUVEM', 'CHUVA', 'VENTO', 'FOGO', 'TERRA', 'AR', 'AVIAO',
  'BARCO', 'TREM', 'ONIBUS', 'BICICLETA', 'TELEFONE', 'RADIO', 'TELEVISAO',

  // Animais
  'CAVALO', 'VACA', 'PORCO', 'GALINHA', 'PATO', 'COELHO', 'RATO', 'MACACO',
  'LEAO', 'TIGRE', 'ELEFANTE', 'GIRAFA', 'ZEBRA', 'CAMELO', 'JACARE', 'PEIXE',

  // Comidas e frutas
  'MELANCIA', 'UVA', 'PERA', 'MORANGO', 'ABACAXI', 'COCO', 'LIMAO', 'BATATA',
  'CENOURA', 'TOMATE', 'ALFACE', 'CEBOLA', 'ABOBORA', 'MELAO', 'MANGA',
  'CAJU', 'GOIABA', 'AMEIXA', 'PESSEGO', 'ARROZ', 'FEIJAO', 'QUEIJO', 'PAO',

  // Lugares e objetos
  'ESCOLA', 'HOSPITAL', 'IGREJA', 'MERCADO', 'LOJA', 'PADARIA', 'RESTAURANTE',
  'HOTEL', 'MUSEU', 'BIBLIOTECA', 'PRAÇA', 'ESTRADA', 'PONTE', 'QUARTO',
  'COZINHA', 'BANHEIRO', 'JARDIM', 'HORTA', 'PORTA', 'TELHADO', 'CHAVE',
  'CADEADO', 'MOCHILA', 'BOLSA', 'CARTEIRA', 'RELOGIO', 'OCULOS', 'ANEL',
  'COLAR', 'BRINCO', 'SAPATO', 'CAMISA', 'CALCA', 'CHAPEU',

  // Profissões
  'PROFESSOR', 'ALUNO', 'MEDICO', 'ENFERMEIRA', 'PESCADOR', 'LENHADOR',
  'MARINHEIRO', 'BOMBEIRO', 'POLICIAL', 'GUERREIRO', 'PIRATA', 'ARTISTA',

  // Palavras difíceis
  'PARALELEPIPEDO', 'OTORRINOLARINGOLOGISTA', 'ANTICONSTITUCIONALISSIMO',
  'INCONSTITUCIONAL', 'IDIOSINCRASIA', 'HIPOPOTAMOMONSTROSESQUIPEDALIOFOBIA',
  'ELETROENCEFALOGRAFISTA', 'DESPROPORCIONALIDADE', 'INVEROSSIMILHANCA',
  'PNEUMOULTRAMICROSCOPICOSSILICOVULCANOCONIOSE', 'MAGNIFICENCIA',
  'EXTRATERRESTRE', 'FOSFORESCENCIA', 'IMPREVISIBILIDADE',
  'INCOMPREENSIVEL', 'MELANCOLIA', 'EFEMERIDADE', 'AERONAVEGABILIDADE',
  'CONTRASSENHA', 'METALINGUAGEM', 'XILOFONE', 'QUIXOTESCO', 'HIPERBOLICO',
  'ARQUITETURA', 'FILOSOFIA', 'METEOROLOGIA', 'PALEONTOLOGIA',
  'BIOQUIMICA', 'NEUROCIENCIA', 'COSMOLOGIA', 'PSICOLOGIA',

  // Palavras aleatórias
  'ZUMBI', 'VAMPIRO', 'MUMIA', 'ESQUELETO', 'MAGIA', 'FEITICO', 'POCAO',
  'DRAGAO', 'UNICORNIO', 'FENIX', 'TROLL', 'ELFO', 'ANJO', 'DEMONIO',
  'CUPIDO', 'ARCOIRIS', 'TEMPORAL', 'TROVÃO', 'RAIO', 'NEVE', 'GELO',
  'INVERNO', 'VERAO', 'OUTONO', 'PRIMAVERA', 'DESERTO', 'OASIS', 'CAVERNA',
  'VOLCÃO', 'TERREMOTO', 'TSUNAMI', 'FURACAO', 'TUFÃO', 'CICLONE', 'MIRAGEM',
  'ESPELHO', 'RETRATO', 'FOTOGRAFIA', 'CINEMA', 'TEATRO', 'MUSICAL', 'DANCA',
  'CIRCO', 'MAGICO', 'ILUSIONISTA', 'ACROBACIA', 'GINASTICA', 'YOGA',
  'MEDITACAO', 'RELIGIAO', 'ESPIRITISMO', 'BUDISMO', 'HINDUISMO', 'ISLAMISMO',
  'JUDAISMO', 'CRISTIANISMO', 'FOTOSSINTSESE', 'CLOROFILA', 'ECOSSISTEMA',
  'BIOMA', 'BIODIVERSIDADE', 'SUSTENTABILIDADE', 'RECICLAGEM', 'ENERGIA',
  'ECOLOGIA', 'ATMOSFERA', 'HIDROSFERA', 'LITOSFERA', 'BIOSFERA', 'GALAXIA',
  'UNIVERSO', 'COSMOS', 'ASTRONOMIA', 'ASTROFISICA', 'TELESCOPIO', 'SATELITE',
  'COMETA', 'ASTEROIDE', 'METEORITO', 'ORBITA', 'GRAVIDADE', 'PESQUISA',
  'EXPERIMENTO', 'INVENTO', 'TECNOLOGIA', 'ROBOtica', 'INTELIGENCIA',
  'CIBERNETICA', 'REALIDADE', 'VIRTUALIDADE', 'SIMULACAO', 'HOLOGRAMA',
  'IMPRESSORA', 'SCANNER', 'PROJETOR', 'DRONE', 'FANTASIA', 'AVENTURA',
  'MISTERO', 'SUSPENSE', 'TERROR', 'COMEDIA', 'ROMANCE', 'FICCAO',
  'DOCUMENTARIO', 'BIOGRAFIA', 'AUTOBIOGRAFIA', 'CRONICA', 'ENSALADA',
  'POESIA', 'LITERATURA', 'CULTURA', 'HISTORIA', 'GEOGRAFIA', 'SOCIOLOGIA',
  'ANTROPOLOGIA', 'ARQUEOLOGIA', 'POLITICA', 'ECONOMIA', 'DIREITO',
  'FARMACIA', 'MEDICINA', 'ENFERMAGEM', 'ODONTOLOGIA', 'VETERINARIA',
  'AGRONOMIA', 'ZOOLOGIA', 'BOTANICA', 'MICROBIOLOGIA', 'GENETICA',
  'BIOLOGIA', 'QUIMICA', 'FISICA', 'MATEMATICA', 'GEOMETRIA', 'ARITMETICA',
  'ALGEBRA', 'TRIGONOMETRIA', 'CALCULO', 'ESTATISTICA', 'PROBABILIDADE',
  'LOGICA', 'FILOSOFIA', 'ETICA', 'ESTETICA', 'EPISTEMOLOGIA', 'ONTOLOGIA',
  'FOGUETE', 'SATELITE', 'PLANETA', 'GALAXIA', 'ASTRONAUTA', 'NAVE',
  'TESOURO', 'CASTELO', 'ESPADA', 'DRAGAO', 'BRUXA', 'FANTASMA', 'MONSTRO',
  'ROBO', 'ALIEN', 'AMAZONA', 'ILHA', 'TESOURA', 'PAPEL', 'LAPIS', 'BORRACHA',
  'REGUA', 'COLA', 'ESCADA', 'PORTAO', 'QUADRO', 'MAPA', 'GLOBO', 'PISCINA',
  'SOFA', 'TRAVESSEIRO', 'COBERTO', 'CAMA', 'COLCHAO', 'TOALHA', 'SABONETE',
  'ESCOVA', 'PENTE', 'SHAMPOO', 'CAMINHAO', 'TRATOR', 'TAXI', 'QUADRA',
  'CAMPO', 'HORTA', 'MERCURIO', 'MARTE', 'JUPITER', 'SATURNO', 'URANO',
  'NETUNO', 'VENUS', 'PLUTAO'
];

const MAX_ERROS = 6; // Definimos o número máximo de tentativas

export default function App() {
  const [palavraSecreta, setPalavraSecreta] = useState('');
  const [letrasCorretas, setLetrasCorretas] = useState<string[]>([]);
  const [letrasIncorretas, setLetrasIncorretas] = useState<string[]>([]);
  // --- NOVO: Estado para controlar o status do jogo ---
  const [statusJogo, setStatusJogo] = useState('jogando'); // pode ser 'jogando', 'vitoria', 'derrota'

  const iniciarJogo = () => {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    const palavraSorteada = palavras[indiceAleatorio];
    setPalavraSecreta(palavraSorteada);
    setLetrasCorretas([]);
    setLetrasIncorretas([]);
    // --- ATUALIZAÇÃO: Reseta o status do jogo ---
    setStatusJogo('jogando');
  };

  useEffect(() => {
    iniciarJogo();
  }, []);

  // --- NOVO: useEffect para verificar vitória ou derrota a cada jogada ---
  useEffect(() => {
    if (palavraSecreta && statusJogo === 'jogando') {
      // Verifica Vitória
      const todasLetrasAdivinhadas = palavraSecreta.split('').every(letra => letrasCorretas.includes(letra));
      if (todasLetrasAdivinhadas) {
        setStatusJogo('vitoria');
        Alert.alert('Parabéns!', 'Você acertou a palavra!');
      }

      // Verifica Derrota
      if (letrasIncorretas.length >= MAX_ERROS) {
        setStatusJogo('derrota');
        Alert.alert('Que pena!', `Você perdeu! A palavra era: ${palavraSecreta}`);
      }
    }
  }, [letrasCorretas, letrasIncorretas, palavraSecreta, statusJogo]);


  const palavraMascarada = () => {
    if (!palavraSecreta) return '';
    // Se o jogo acabou, mostra a palavra completa
    if (statusJogo !== 'jogando') {
      return palavraSecreta.split('').join(' ');
    }
    return palavraSecreta
      .split('')
      .map(letra => (letrasCorretas.includes(letra) ? letra : '_'))
      .join(' ');
  };

  const handleLetraPressionada = (letra: string) => {
    // Só permite jogar se o status for 'jogando'
    if (statusJogo !== 'jogando' || letrasCorretas.includes(letra) || letrasIncorretas.includes(letra)) {
      return;
    }

    if (palavraSecreta.includes(letra)) {
      setLetrasCorretas([...letrasCorretas, letra]);
    } else {
      setLetrasIncorretas([...letrasIncorretas, letra]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Forca</Text>

      <Forca numeroErros={letrasIncorretas.length} />
      
      <Text style={styles.palavra}>{palavraMascarada()}</Text>
      
      <View style={styles.letrasContainer}>
        <Text style={styles.letrasTexto}>Letras erradas: {letrasIncorretas.join(', ')}</Text>
      </View>

      <Text style={styles.tentativasTexto}>Tentativas restantes: {MAX_ERROS - letrasIncorretas.length}</Text>
      
      {/* O teclado só será mostrado se o jogo estiver em andamento */}
      {statusJogo === 'jogando' ? (
        <Teclado onLetraPressionada={handleLetraPressionada}
        letrasDesabilitadas={[...letrasCorretas, ...letrasIncorretas]} 
        />
        ) : (
        <Text style={styles.mensagemFimDeJogo}>
          {statusJogo === 'vitoria' ? 'Você venceu! 🎉' : 'Você perdeu! 😢'}
        </Text>
        )}

      {/* --- NOVO: Botão para reiniciar o jogo --- */}
      <View style={styles.botaoReiniciarContainer}>
        <Button title="Reiniciar Jogo" onPress={iniciarJogo} color="#007BFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  palavra: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 8,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center'
  },
  letrasContainer: {
    minHeight: 30, // Garante espaço mesmo quando vazio
    marginBottom: 5,
  },
  letrasTexto: {
    fontSize: 18,
    color: '#d9534f',
    fontWeight: '500',
  },
  tentativasTexto: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  mensagemFimDeJogo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  botaoReiniciarContainer: {
    marginTop: 30,
    width: '60%',
    borderRadius: 8,
    overflow: 'hidden', // Necessário para o borderRadius funcionar no Android
  }
});