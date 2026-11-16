import { Button } from "./components/Button";
import { ThemeContext } from "./theme/ThemeContext";
import "./App.css";

const buttonExamples = [
  { variant: "fill", size: "S" },
  { variant: "fill", size: "M" },
  { variant: "fill", size: "L" },
  { variant: "outline", size: "S" },
  { variant: "outline", size: "M" },
  { variant: "outline", size: "L" },
  { variant: "text", size: "S" },
  { variant: "text", size: "M" },
  { variant: "text", size: "L" },
] as const;

export default function App() {
  return (
    <div className="app">
      <div className="table-wrapper">
        <table className="button-table">
          <thead>
            <tr>
              <th scope="col">Вариант</th>
              <th scope="col">Размер</th>
              <th scope="col">Обычное состояние</th>
              <th scope="col">Disabled</th>
            </tr>
          </thead>
          <tbody>
            {buttonExamples.map(({ variant, size }) => (
              <tr key={`${variant}-${size}`}>
                <th scope="row">{variant}</th>
                <td>{size}</td>
                <td>
                  <Button variant={variant} size={size}>
                    Кнопка
                  </Button>
                </td>
                <td>
                  <Button variant={variant} size={size} disabled>
                    Кнопка
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="theme-example">
        <h2>Кнопка с настройкой темы</h2>
        <ThemeContext
          tokens={{
            buttonFillBackgroundColor: "#15803d",
            buttonFillTextColor: "#ffffff",
            buttonFillHoverBackgroundColor: "#166534",
            buttonFillHoverTextColor: "#ffffff",
            buttonFillActiveBackgroundColor: "#14532d",
            buttonFillActiveTextColor: "#ffffff",
            buttonFillDisabledBackgroundColor: "#e2eee5",
            buttonFillDisabledTextColor: "#718078",
            buttonDisabledOpacity: "1",
          }}
        >
          <Button>Зеленая кнопка</Button>
          <Button disabled>Зеленая disabled-кнопка</Button>
        </ThemeContext>
      </section>
    </div>
  )
}