export default function calculateAge(birthday: string, deathday: string) {
  const today = new Date();

  const birthDate = new Date(birthday);
  const deathDate = new Date(deathday);
  let age = 0;

  if (!deathday) {
    age = Math.abs(today.getFullYear() - birthDate.getFullYear());
  } else {
    age = Math.abs(deathDate.getFullYear() - birthDate.getFullYear());
  }

  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  } else if (m < 0 || (m === 0 && deathDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
