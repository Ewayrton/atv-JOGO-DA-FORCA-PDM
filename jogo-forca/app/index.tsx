import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Teclado from '@/components/Teclado';

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

export default function App() {
  const [palavraSecreta, setPalavraSecreta] = useState('');
  const [letrasCorretas, setLetrasCorretas] = useState<string[]>([]);

  const iniciarJogo = () => {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    const palavraSorteada = palavras[indiceAleatorio];
    setPalavraSecreta(palavraSorteada);
    setLetrasCorretas([]); // Limpa as letras corretas ao iniciar um novo jogo
  }

  useEffect(() => {
    iniciarJogo();
  }, []);

  // Função para para renderizar a palavra com underlines
  const palavraMascarada = () => {
    if (!palavraSecreta) return '';

    return palavraSecreta.split('').map(letra => (
      letrasCorretas.includes(letra) ? letra : '_'
    )).join(' ');
  };
  const handleLetraPressionada = (letra: string) => {
    console.log('Letra pressionada:', letra); // Por enquanto, só exibi no console
  };

  return (
    <View style={styles.container}>
      <Text style={styles.palavra}>{palavraMascarada()}</Text>
      <Teclado onLetraPressionada={handleLetraPressionada} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  palavra: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 8,
    marginBottom: 20,
  }
});