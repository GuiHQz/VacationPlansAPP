const apiUrl = import.meta.env.VITE_API_URL;

export const post = async (data: any) => {
  try {
    const response = await fetch(`${apiUrl}/api/holiday-plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar plano de férias.");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao adicionar plano de férias: ${error.message}`);
    } else {
      throw new Error(
        `Erro desconhecido ao adicionar plano de férias: ${error}`
      );
    }
  }
};

export const deleteHolidayPlan = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/holiday-plans/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir plano de férias.");
    }

    console.log("Plano de férias excluído com sucesso.");
  } catch (error) {
    throw new Error(`Erro ao excluir plano de férias: ${error}`);
  }
};
