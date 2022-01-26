import React, { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import pokeball from "../images/pokeball.png";

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

              <input className="pxl-border no-inset" onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value.toUpperCase())} />

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
        }}
      >
        <h2>{name}</h2>

        <img src={sprite} alt={name} width={256} height={256} />

        <div>
          <h3>Type</h3>
          {types.map((type, index: any) => (
            <div key={index} className="pxl-border inset">
              <span>{type}</span>
            </div>
          ))}
        </div>

        <div>
          <h3>Moves</h3>
          {moves.map((move, index: any) => (
            <div key={index} className="pxl-border" style={{ marginBottom: 16, marginRight: 16 }}>
              <span>{move}</span>
            </div>
          ))}
        </div>

        <nav
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            height: 224,
            background: "linear-gradient(180deg, #FDFDFD 0%, rgba(253, 253, 253, 0) 0.01%, rgba(253, 253, 253, 0.97) 30.37%, #FDFDFD 100%)",
          }}
        >
          <div
            style={{
              padding: 16,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Button onClick={() => throwPokeball()}>
              <img src={pokeball} alt="pokeball" width={32} height={32} />
              <span>Catch</span>
            </Button>
            <div
              style={{
                display: "flex",
                gap: 16,
              }}
            >
              <Link to="/" style={{ flexBasis: "50%", display: "flex" }}>
                <Button>Explore</Button>
              </Link>
              <Link to="/my-pokemon" style={{ flexBasis: "50%", display: "flex" }}>
                <Button>My Pokemon</Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Detail;
