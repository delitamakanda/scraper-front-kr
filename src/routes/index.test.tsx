import { describe, it, expect } from "vitest";
import { render, screen} from '~/test/test-utils'
import { RouteComponent } from './index'

describe('Index Route', () => {
    it('should render the Index Page', () => {
        render(<RouteComponent />)
        expect(screen.getByRole('main')).toBeInTheDocument()
    })
})