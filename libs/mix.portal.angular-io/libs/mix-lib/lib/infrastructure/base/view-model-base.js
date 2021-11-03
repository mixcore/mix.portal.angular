import { MixPortalRepository } from '../../repositories/portal/mix-portal-repository';
export class ViewModelBase {
    /**
     *
     */
    constructor(modelType, model) {
        this.repository = new MixPortalRepository(modelType);
        if (model) {
            this.parseView(model);
        }
    }
    create() {
        const model = this.parseModel();
        return this.repository.createModel(model);
    }
    update() {
        const model = this.parseModel();
        return this.repository.updateModel(this.id, model);
    }
    delete(id) {
        return this.repository.deleteModel(id);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1tb2RlbC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbWl4bGliL3NyYy9saWIvaW5mcmFzdHJ1Y3R1cmUvYmFzZS92aWV3LW1vZGVsLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFFdEYsTUFBTSxPQUFnQixhQUFhO0lBR2pDOztPQUVHO0lBQ0gsWUFBWSxTQUF1QixFQUFFLEtBQVM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNNLE1BQU07UUFDWCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDTSxNQUFNLENBQUMsRUFBbUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBSUYifQ==