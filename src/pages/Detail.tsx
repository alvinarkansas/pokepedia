import React, { FormEvent, ChangeEvent, useEffect, useState, createRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { theme, spacing } from "../utils";
import pokeball from "../images/pokeball.png";
import pokeballTransparent from "../images/pokeball-transparent.png";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Text from "../components/Text";
import Input from "../components/Input";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useGlobalContext } from "../context";
import { generatePokeSummary } from "../helpers";
import TypeCard from "../components/TypeCard";
import Loading from "../components/Loading";

const Page = styled("div")({
  "#pokeball-bg": {
    position: "fixed",
    right: "-64vw",
    top: 0,
    zIndex: -1,
  },
});

const PokeImg = styled("img")({
  margin: "0 auto",
});

const PokeName = styled("div")(
  {
    position: "relative",
    height: "40px",
    width: "65vw",
    marginTop: spacing.xl,
    h1: {
      textTransform: "uppercase",
      position: "absolute",
      top: -20,
      left: 24,
    },
    div: {
      position: "absolute",
      width: "100%",
      background: theme.color["neutral-600"],
      bottom: 0,
    },
  },
  `
    div:nth-of-type(1) {
      height: 1.75rem;
      right: 20px;
    }
    div:nth-of-type(2) {
      height: 1.25rem;
      right: 10px;
    }
    div:nth-of-type(3) {
      height: 0.75rem;
      right: 0;
    }
  `
);

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: spacing.xl,
  padding: "0 16px",
  h3: {
    marginBottom: spacing.base,
  },
});

const shake = keyframes`
  0 { transform: translate(0, 0) rotate(0); }
  20% { transform: translate(-10px, 0) rotate(-20deg); }
  30% { transform: translate(10px, 0) rotate(20deg); }
  50% { transform: translate(-10px, 0) rotate(-10deg); }
  60% { transform: translate(10px, 0) rotate(10deg); }
  100% { transform: translate(0, 0) rotate(0); }
`;

const CatchingModal = styled("div")`
  .pokeball {
    animation: ${shake} 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2;
  }
`;

const PostCatchModal = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: {
    textAlign: "center",
  },
});

const NicknamingModal = styled("div")({
  width: "100vw",
  padding: "0 16px",
});

const NicknamingForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: spacing.base,
});

const DescriptionLoadingWrapper = styled("div")({
  div: {
    justifyContent: "flex-start",
  },
});

const ImageLoadingWrapper = styled("div")({
  width: 256,
  height: 256,
  display: "grid",
  placeItems: "center",
  margin: "0 auto",
});

const Grid = styled("div")(
  {
    display: "grid",
    columnGap: 8,
    rowGap: 0,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  `
  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  `
);

const Detail = () => {
  const { name } = useParams();
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const [sprite, setSprite] = useState("");
  const [isCatching, setIsCatching] = useState(false);
  const [isEndPhase, setIsEndPhase] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameModal, setNicknameModal] = useState(false);
  const [nicknameIsValid, setNicknameIsValid] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const { setState } = useGlobalContext();
  const navRef = createRef<HTMLDivElement>();

  const loadPokemon = async () => {
    try {
      setIsLoading(true);
      const {
        data: { types, sprites, moves },
      } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name);

      setTypes(types.map((type: any) => type.type.name));
      setMoves(moves.map((move: any) => move.move.name));
      setSprite(sprites.front_default);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const catchPokemon = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() < 0.5 ? false : true);
      }, 2000);
    });
  };

  const throwPokeball = async () => {
    setIsCatching(true);
    const isCaught = await catchPokemon();
    setIsCatching(false);
    setIsEndPhase(true);

    if (isCaught) {
      setIsCaught(true);
    } else {
      setIsCaught(false);
    }
    setTimeout(() => {
      setIsEndPhase(false);
      isCaught && setNicknameModal(true);
    }, 1200);
  };

  const onNicknameSave = (e: FormEvent) => {
    e.preventDefault();

    const currentCollection = localStorage.getItem("myPokemon");
    const parsed: { name: string; nickname: string }[] = JSON.parse(currentCollection!) || [];

    let isUnique = true;
    for (let collection of parsed) {
      if (collection.nickname === nickname) {
        setNicknameIsValid(false);
        isUnique = false;
        return;
      } else {
        !nicknameIsValid && setNicknameIsValid(true);
        isUnique = true;
      }
    }

    if (isUnique) {
      parsed.push({
        name: name!.toUpperCase(),
        nickname,
      });
      localStorage.setItem("myPokemon", JSON.stringify(parsed));
      setState({ pokeSummary: generatePokeSummary(parsed) });
      setIsSaved(true);
    }
  };

  useEffect(() => {
    setNavHeight(navRef.current?.clientHeight!);
    loadPokemon();
  }, []);

  return (
    <>
      <Modal open={isCatching}>
        <CatchingModal>
          <PokeImg src={sprite} alt={name} width={320} height={320} />

          <div style={{ display: "grid", placeItems: "center" }}>
            <img className="pokeball" src={pokeball} alt="pokeball" width={128} height={128} />
            <Text variant="outlined" size="xl">
              Catching...
            </Text>
          </div>
        </CatchingModal>
      </Modal>

      {isEndPhase && (
        <>
          <Modal open={!isCaught} overlay="error">
            <PostCatchModal>
              <PokeImg src={sprite} alt={name} width={320} height={320} />

              <img src={pokeball} alt="pokeball" width={128} height={128} />
              <Text variant="outlined" size="xl">
                Oh no, {name?.toUpperCase()} broke free
              </Text>
            </PostCatchModal>
          </Modal>
          <Modal open={isCaught} overlay="light">
            <PostCatchModal>
              <PokeImg src={sprite} alt={name} width={320} height={320} />

              <img src={pokeball} alt="pokeball" width={128} height={128} />
              <Text variant="outlined" size="xl">
                Gotcha! {name?.toUpperCase()} was caught!
              </Text>
            </PostCatchModal>
          </Modal>
        </>
      )}

      <Modal open={nicknameModal} overlay="light" solid>
        <NicknamingModal>
          <PokeImg src={sprite} alt={name} width={320} height={320} />

          {!isSaved ? (
            <NicknamingForm onSubmit={onNicknameSave}>
              {nicknameIsValid ? (
                <div className="pxl-border" style={{ textAlign: "left" }}>
                  <Text>Congratulations!</Text>
                  <Text>You just caught a {name?.toUpperCase()}</Text>
                  <br />
                  <Text>Now please give {name?.toUpperCase()} a nickname...</Text>
                </div>
              ) : (
                <div className="pxl-border" style={{ textAlign: "left" }}>
                  <Text variant="error">Nickname is taken</Text>
                  <Text>Please pick another nickname...</Text>
                </div>
              )}

              <Input
                required
                placeholder="enter a nickname"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value.toUpperCase())}
              />

              <Button type="submit">Save</Button>
            </NicknamingForm>
          ) : (
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 16 }}>
              <div className="pxl-border" style={{ textAlign: "left" }}>
                <Text>Whoosh! {nickname} is now in your Pokemon list</Text>
              </div>

              <Link to="/my-pokemon">
                <Button variant="zapdos">See My Pokemon</Button>
              </Link>
              <Link to="/">
                <Button>Catch Another</Button>
              </Link>
            </div>
          )}
        </NicknamingModal>
      </Modal>

      <Page style={{ marginBottom: navHeight }}>
        <img id="pokeball-bg" src={pokeballTransparent} alt="pokeball background" width={512} height={512} />
        <PokeName>
          <div />
          <div />
          <div />
          <Text as="h1" variant="outlined" size="xl">
            {name}
          </Text>
        </PokeName>

        {!isLoading ? (
          <PokeImg src={sprite} alt={name} width={256} height={256} />
        ) : (
          <ImageLoadingWrapper>
            <Loading />
          </ImageLoadingWrapper>
        )}

        <Content>
          <div>
            <Text as="h3">Type</Text>
            {!isLoading ? (
              types && types.map((type, index: any) => <TypeCard key={index} type={type} />)
            ) : (
              <DescriptionLoadingWrapper>
                <Loading label="Loading types..." />
              </DescriptionLoadingWrapper>
            )}
          </div>

          <div>
            <Text as="h3">Moves</Text>
            {!isLoading ? (
              <Grid>
                {moves &&
                  moves.map((move, index: any) => (
                    <div key={index} className="pxl-border" style={{ marginBottom: 16, marginRight: 16 }}>
                      <Text>{move}</Text>
                    </div>
                  ))}
              </Grid>
            ) : (
              <DescriptionLoadingWrapper>
                <Loading label="Loading moves..." />
              </DescriptionLoadingWrapper>
            )}
          </div>
        </Content>
      </Page>

      <Navbar ref={navRef} fadeHeight={224}>
        {!isLoading && (
          <Button variant="moltres" onClick={() => throwPokeball()} size="xl" icon={pokeball}>
            Catch
          </Button>
        )}
      </Navbar>
    </>
  );
};

export default Detail;
