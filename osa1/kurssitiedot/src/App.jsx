const Course = (props) => (
  <>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </>
);
const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part part={part} />
    ))}
  </>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.parts.reduce((acc, part) => acc + part.exercises, 0)}
  </p>
);
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
