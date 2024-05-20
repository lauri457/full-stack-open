const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content course={course}></Content>
    </div>
  );
};
const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
      <div style={{ fontWeight: "bold" }}>
        total of {course.parts.reduce((s, p) => s + p.exercises, 0)} exercises
      </div>
    </div>
  );
};
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Course;
