import { renderHook } from "@testing-library/react-native"
import { useCounter } from "../useCounter";



describe('useCounter',()=>{

  it('démarre à 0 par défaut', async () => {
    const { result } = await renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

})