import React, { FormEvent, ChangeEvent, useEffect, useState, createRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { theme } from "../utils";
import pokeball from "../images/pokeball.png";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Text from "../components/Text";

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
  const [navHeight, setNavHeight] = useState(0);
  const navRef = createRef<HTMLDivElement>();

  const loadPokemon = async () => {
    try {
      const {
        data: { types, sprites, moves },
      } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name);

      setTypes(types.map((type: any) => type.type.name));
      setMoves(moves.map((move: any) => move.move.name));
      setSprite(sprites.front_default);
    } catch (error) {
      console.log(error);
    }
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
        <img src={sprite} alt={name} width={320} height={320} />

        <div style={{ display: "grid", placeItems: "center" }}>
          <img src={pokeball} alt="pokeball" width={128} height={128} />
          <span style={{ color: "white", fontSize: 40 }}>Catching...</span>
        </div>
      </Modal>

      {isEndPhase && (
        <>
          <Modal open={!isCaught} overlay="error">
            <img src={sprite} alt={name} width={320} height={320} />

            <div style={{ display: "grid", placeItems: "center" }}>
              <img src={pokeball} alt="pokeball" width={128} height={128} />
              <span style={{ color: "white", fontSize: 40, textAlign: "center" }}>Oh no, {name?.toUpperCase()} broke free</span>
            </div>
          </Modal>
          <Modal open={isCaught} overlay="light">
            <img src={sprite} alt={name} width={320} height={320} />

            <div style={{ display: "grid", placeItems: "center" }}>
              <img src={pokeball} alt="pokeball" width={128} height={128} />
              <span style={{ color: "white", fontSize: 40, textAlign: "center" }}>Gotcha! {name?.toUpperCase()} was caught!</span>
            </div>
          </Modal>
        </>
      )}

      <Modal open={nicknameModal}>
        <div style={{ background: "#FFF", height: "100vh", width: "100vw", display: "grid", placeItems: "center" }}>
          <img src={sprite} alt={name} width={320} height={320} />

          {!isSaved ? (
            <form onSubmit={onNicknameSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {nicknameIsValid ? (
                <div className="pxl-border" style={{ textAlign: "left" }}>
                  <p>Congratulations!</p>
                  <p>You just caught a {name?.toUpperCase()}</p>
                  <br />
                  <p>Now please give {name?.toUpperCase()} a nickname...</p>
                </div>
              ) : (
                <div className="pxl-border" style={{ textAlign: "left" }}>
                  <p style={{ color: "#AF2A2A" }}>Nickname is taken</p>
                  <p>Please pick another nickname...</p>
                </div>
              )}

              <input
                className="pxl-border no-inset"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value.toUpperCase())}
              />

              <Button type="submit">Save</Button>
            </form>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="pxl-border" style={{ textAlign: "left" }}>
                <p>Whoosh! {nickname} is now in your Pokemon list</p>
              </div>

              <Link to="/my-pokemon">
                <Button>See My Pokemon</Button>
              </Link>
              <Link to="/">
                <Button>Catch Another</Button>
              </Link>
            </div>
          )}
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          marginBottom: navHeight,
        }}
      >
        <div style={{ background: theme.color["neutral-500"], width: "40vw", height: "16px", marginTop: 16, position: "relative" }}>
          <Text as="h1" variant="outlined" size="lg" style={{ position: "absolute", top: -16, left: 64 }}>
            {name}
          </Text>
        </div>

        <img src={sprite} alt={name} width={256} height={256} />

        <div>
          <Text as="h3">Type</Text>
          {types.map((type, index: any) => (
            <div key={index} className="pxl-border inset">
              <Text>{type}</Text>
            </div>
          ))}
        </div>

        <div>
          <Text as="h3">Moves</Text>
          {moves.map((move, index: any) => (
            <div key={index} className="pxl-border" style={{ marginBottom: 16, marginRight: 16 }}>
              <Text>{move}</Text>
            </div>
          ))}
        </div>
      </div>

      <Navbar ref={navRef} fadeHeight={224}>
        <Button variant="moltres" onClick={() => throwPokeball()} size="xl" icon={pokeball}>
          Catch
        </Button>
      </Navbar>
    </>
  );
};

export default Detail;
