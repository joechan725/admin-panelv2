// Code reference: https://github.com/qualdesk/firestore-big-batch

const maxOperationsPerFirestoreBatch = 499;

export class BigBatch {
  private firestore: FirebaseFirestore.Firestore;
  private currentBatch: FirebaseFirestore.WriteBatch;
  private batchArray: Array<FirebaseFirestore.WriteBatch>;
  private operationCounter: number;

  constructor(firestore: FirebaseFirestore.Firestore) {
    this.firestore = firestore;
    this.currentBatch = firestore.batch();
    this.batchArray = [this.currentBatch];
    this.operationCounter = 0;
  }

  public set(ref: FirebaseFirestore.DocumentReference, data: object, options: FirebaseFirestore.SetOptions = {}) {
    this.currentBatch.set(ref, data, options);
    this.incrementOperationCounter();
  }

  public create(ref: FirebaseFirestore.DocumentReference, data: object) {
    this.currentBatch.create(ref, data);
    this.incrementOperationCounter();
  }

  public update(ref: FirebaseFirestore.DocumentReference, data: object) {
    this.currentBatch.update(ref, data);
    this.incrementOperationCounter();
  }

  public delete(ref: FirebaseFirestore.DocumentReference) {
    this.currentBatch.delete(ref);
    this.incrementOperationCounter();
  }

  public commit() {
    const promises = this.batchArray.map((batch) => batch.commit());
    return Promise.all(promises);
  }

  private incrementOperationCounter() {
    this.operationCounter++;
    if (this.operationCounter === maxOperationsPerFirestoreBatch) {
      this.createNewBatch();
    }
  }

  private createNewBatch() {
    this.currentBatch = this.firestore.batch();
    this.batchArray.push(this.currentBatch);
    this.operationCounter = 0;
  }
}
