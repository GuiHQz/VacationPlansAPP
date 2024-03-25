const apiUrl = import.meta.env.VITE_API_URL;

export async function post(data: any): Promise<any> {
  try {
    const response = await fetch(`${apiUrl}/api/holiday-plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar plano de férias.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao adicionar plano de férias: ${error.message}`);
    } else {
      throw new Error(`Erro desconhecido ao adicionar plano de férias: ${error}`);
    }
  }
}