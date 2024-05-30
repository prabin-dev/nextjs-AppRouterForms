export async function validateZipCode(zipCode: string): Promise<boolean> {
  console.log("Validating zip code on SERVER", zipCode);
  return /^\d{5}$/.test(zipCode) && zipCode.startsWith("9");
}
