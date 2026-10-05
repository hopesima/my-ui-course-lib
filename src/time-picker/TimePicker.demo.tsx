import {
  TimePicker,
} from "./TimePicker";

import "./TimePicker.demo.css";


const examples = [
  {
    title: "Default",
    description: "Базовый TimePicker без дополнительных настроек",
    component: (
      <TimePicker />
    ),
  },


  {
    title: "12 hour format",
    description: "12-часовой формат с AM / PM",
    component: (
      <TimePicker
        hourCycle={12}
      />
    ),
  },


  {
    title: "With seconds",
    description: "Выбор часов, минут и секунд",
    component: (
      <TimePicker
        precision="second"
      />
    ),
  },


  {
    title: "Minute step",
    description: "Минуты с шагом 15",
    component: (
      <TimePicker
        minuteStep={15}
      />
    ),
  },


  {
    title: "Now button",
    description: "Автоматическая установка текущего времени",
    component: (
      <TimePicker
        showNow
      />
    ),
  },


  {
    title: "Clear button",
    description: "Очистка выбранного значения",
    component: (
      <TimePicker
        allowClear
      />
    ),
  },


  {
    title: "Now + Clear",
    description: "Обе дополнительные кнопки внутри dropdown",
    component: (
      <TimePicker
        showNow
        allowClear
      />
    ),
  },


  {
    title: "Error state",
    description: "Ошибка валидации",
    component: (
      <TimePicker
        status="error"
        message="Invalid time"
      />
    ),
  },


  {
    title: "Warning state",
    description: "Предупреждение",
    component: (
      <TimePicker
        status="warning"
        message="Outside working hours"
      />
    ),
  },


  {
    title: "Disabled",
    description: "Недоступный компонент",
    component: (
      <TimePicker
        disabled
      />
    ),
  },


  {
    title: "Read only",
    description: "Только просмотр",
    component: (
      <TimePicker
        readOnly
      />
    ),
  },


  {
    title: "Fill variant",
    description: "Заполненный стиль",
    component: (
      <TimePicker
        variant="fill"
      />
    ),
  },


  {
    title: "Borderless variant",
    description: "Без рамки",
    component: (
      <TimePicker
        variant="borderless"
      />
    ),
  },


  {
    title: "Underline variant",
    description: "Только нижняя линия",
    component: (
      <TimePicker
        variant="underline"
      />
    ),
  },


  {
    title: "Small size",
    description: "Размер S",
    component: (
      <TimePicker
        size="s"
      />
    ),
  },


  {
    title: "Large size",
    description: "Размер L",
    component: (
      <TimePicker
        size="l"
      />
    ),
  },


  {
    title: "Full example",
    description:
      "12 часов + секунды + Now + Clear + validation",
    component: (
      <TimePicker
        label="Meeting time"
        hourCycle={12}
        precision="second"
        showNow
        allowClear
        status="warning"
        message="Check timezone"
      />
    ),
  },
];



export function TimePickerDemo() {

  return (
    <div className="time-picker-demo">

      <h1>
        TimePicker examples
      </h1>


      <div className="time-picker-demo__table">

        {examples.map((item) => (

          <div
            key={item.title}
            className="time-picker-demo__row"
          >

            <div className="time-picker-demo__info">

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

            </div>



            <div className="time-picker-demo__preview">

              {item.component}

            </div>


          </div>

        ))}

      </div>

    </div>
  );
}