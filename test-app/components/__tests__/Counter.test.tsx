import { render, screen } from "@testing-library/react-native"
import { Counter } from "../Counter"



describe('Counter',()=>{

    it('affiche label et valeur initiale',async ()=>{
        await render(<Counter label="Quantité" initial = {3}/>)

        expect(screen.getByText('Quantité')).toBeOnTheScreen()
        expect(screen.getByTestId('counter-value')).toHaveTextContent('3')
        expect(screen.getByAccessibilityHint('Counter value')).toHaveTextContent("3")
    })
})