export const getCountries = async () => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/independent?status=true&fields=name,idd,flag'
    );
    return await response.json();
  } catch (error) {
    console.log('error = ', error);
  }
};
