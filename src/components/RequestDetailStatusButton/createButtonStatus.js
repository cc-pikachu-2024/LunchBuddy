export const createButtonStatus = (request, user, setIsPushed) => {
  const updateStatus = async (request, user, statusId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_HOST}/requests/statuses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: request.id,
          userId: user.userId,
          statusId: statusId,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const isDisplay = true;
  const text = "まかせて！";
  const onClick = async () => {
    setIsPushed(true);
    await updateStatus(request, user, 2);
  };

  return { isDisplay, text, onClick };
};
