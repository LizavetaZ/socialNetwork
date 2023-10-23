import {create} from "react-test-renderer";
import ProfileStatus from "components/Profile/ProfileInfo/ProfileStatus";

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'it-camasutra'} updateStatus={() => {}} />);
        const instance = component.root.findByType(ProfileStatus);
        const instanceState = instance.props.status;
        expect(instanceState).toBe('it-camasutra');
    })

    test('after creation span with correct status should be displayed', () => {
        const component = create(<ProfileStatus status={'it-camasutra'} updateStatus={() => {}}/>)
        const root = component.root
        let span = root?.findByType('span')
        expect(span).not.toBeNull()
    })

    test("after creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={'it-camasutra'} updateStatus={() => {}}/>)
        const root = component.root
        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })

    test('after creation span with correct status should be displayed', () => {
        const component = create(<ProfileStatus status={'it-camasutra'} updateStatus={() => {}}/>)
        const root = component.root
        let span = root?.findByType('span')
        expect(span?.children[0]).toBe('it-camasutra')
    })

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status={'it-camasutra'} updateStatus={() => {}}/>)
        const root = component.root
        let span = root?.findByType('span')
        span?.props.onDoubleClick()
        let input = root?.findByType('input')
        expect(input?.props.value).toBe('it-camasutra')
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={'it-camasutra'} updateStatus={mockCallback} />);
        const instance = component.root.findByType(ProfileStatus);
        instance.instance.deactivateEditMode(); // Вызываем метод deactivateEditMode на экземпляре компонента
        expect(mockCallback.mock.calls.length).toBe(1);
    })
})