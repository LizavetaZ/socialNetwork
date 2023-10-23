import {create} from "react-test-renderer";
import {Paginator} from "components/common/Paginator/Paginator";

describe('Paginetor component tests', () => {
    test('pages count is 11, but should be showed only 10', () => {
        const component = create(
            <Paginator pageSize={1} totalItemsCount={11} currentPage={1} onPageChanged={() => {}} portionSize={10} />
        );
        const root = component.root;
        const spans = root.findAllByType('span');
        expect(spans.length).toBe(10);
    })

    test('if pages count is more than 10, button NEXT should be present', () => {
        const component = create(<Paginator pageSize={1} totalItemsCount={11} currentPage={1} onPageChanged={() => {}} portionSize={10}/>)
        const root = component.root
        const buttons = root.findAllByType('button')
        expect(buttons.length).toBe(1)
    })
})