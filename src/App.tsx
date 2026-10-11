import { Button } from "./components/Button";
import "./App.css";

function App() {
  return (
    <div className="table">
      <section>
        <h3 className="variant">variant</h3>
        <h3 className="size">size</h3>
        <h3 className="default">default</h3>
        <h3 className="hover">:hover</h3>
        <h3 className="active">:active</h3>
        <h3 className="disabled">disabled</h3>
        <h3 className="link">link</h3>
      </section>

      <section className="row">
        <h3 className="fill1">fill</h3>
        <h3 className="s1">S</h3>
        <div className="fill_s buttons">
          <Button variant="fill" size="S">Кнопка</Button>
          <Button variant="fill" size="S" state="hover">Кнопка</Button>
          <Button variant="fill" size="S" state="active">Кнопка</Button>
          <Button variant="fill" size="S" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="fill" size="S">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="fill2">fill</h3>
        <h3 className="m1">M</h3>
        <div className="fill_m buttons">
          <Button variant="fill" size="M">Кнопка</Button>
          <Button variant="fill" size="M" state="hover">Кнопка</Button>
          <Button variant="fill" size="M" state="active">Кнопка</Button>
          <Button variant="fill" size="M" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="fill" size="M">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="fill3">fill</h3>
        <h3 className="l1">L</h3>
        <div className="fill_l buttons">
          <Button variant="fill" size="L">Кнопка</Button>
          <Button variant="fill" size="L" state="hover">Кнопка</Button>
          <Button variant="fill" size="L" state="active">Кнопка</Button>
          <Button variant="fill" size="L" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="fill" size="L">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="outline1">outline</h3>
        <h3 className="s2">S</h3>
        <div className="outline_s buttons">
          <Button variant="outline" size="S">Кнопка</Button>
          <Button variant="outline" size="S" state="hover">Кнопка</Button>
          <Button variant="outline" size="S" state="active">Кнопка</Button>
          <Button variant="outline" size="S" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="outline" size="S">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="outline2">outline</h3>
        <h3 className="m2">M</h3>
        <div className="outline_m buttons">
          <Button variant="outline" size="M">Кнопка</Button>
          <Button variant="outline" size="M" state="hover">Кнопка</Button>
          <Button variant="outline" size="M" state="active">Кнопка</Button>
          <Button variant="outline" size="M" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="outline" size="M">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="outline3">outline</h3>
        <h3 className="l2">L</h3>
        <div className="outline_l buttons">
          <Button variant="outline" size="L">Кнопка</Button>
          <Button variant="outline" size="L" state="hover">Кнопка</Button>
          <Button variant="outline" size="L" state="active">Кнопка</Button>
          <Button variant="outline" size="L" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="outline" size="L">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="text1">text</h3>
        <h3 className="s3">S</h3>
        <div className="text_s buttons">
          <Button variant="text" size="S">Кнопка</Button>
          <Button variant="text" size="S" state="hover">Кнопка</Button>
          <Button variant="text" size="S" state="active">Кнопка</Button>
          <Button variant="text" size="S" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="text" size="S">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="text2">text</h3>
        <h3 className="m3">M</h3>
        <div className="text_m buttons">
          <Button variant="text" size="M">Кнопка</Button>
          <Button variant="text" size="M" state="hover">Кнопка</Button>
          <Button variant="text" size="M" state="active">Кнопка</Button>
          <Button variant="text" size="M" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="text" size="M">
            Кнопка
          </Button>
        </div>
      </section>

      <section className="row">
        <h3 className="text3">text</h3>
        <h3 className="l3">L</h3>
        <div className="text_l buttons">
          <Button variant="text" size="L">Кнопка</Button>
          <Button variant="text" size="L" state="hover">Кнопка</Button>
          <Button variant="text" size="L" state="active">Кнопка</Button>
          <Button variant="text" size="L" disabled>Кнопка</Button>
          <Button className="link_button" as="a" href="#about" variant="text" size="L">
            Кнопка
          </Button>
        </div>
      </section>
    </div>
  );
}

export default App;